from urllib.parse import urljoin

import httpx

from app.core.config import settings
from app.schemas.schemas import LocationSummary


def fallback_location(source: str = "fallback") -> LocationSummary:
  return LocationSummary(region_key=settings.amap_fallback_region_key, source=source)


def amap_enabled() -> bool:
  return len(settings.amap_web_service_key.strip()) > 0


def value_as_string(data: dict[str, object], key: str) -> str | None:
  value = data.get(key)
  if isinstance(value, str) and value.strip():
    return value.strip()
  return None


def region_from_parts(province: str | None, city: str | None, adcode: str | None) -> str:
  if adcode:
    return f"adcode:{adcode}"
  if city:
    return f"city:{city}"
  if province:
    return f"province:{province}"
  return settings.amap_fallback_region_key


def request_amap(path: str, params: dict[str, str]) -> dict[str, object] | None:
  if not amap_enabled():
    return None
  query = {**params, "key": settings.amap_web_service_key.strip(), "output": "JSON"}
  url = urljoin(settings.amap_web_service_base_url.rstrip("/") + "/", path.lstrip("/"))
  try:
    with httpx.Client(timeout=3.0) as client:
      response = client.get(url, params=query)
      response.raise_for_status()
      payload = response.json()
      if isinstance(payload, dict):
        return payload
  except httpx.HTTPError:
    return None
  except ValueError:
    return None
  return None


def locate_by_ip(ip: str | None = None) -> LocationSummary:
  params: dict[str, str] = {}
  if ip:
    params["ip"] = ip
  payload = request_amap("/v3/ip", params)
  if payload is None or value_as_string(payload, "status") != "1":
    return fallback_location("amap_ip_fallback")

  province = value_as_string(payload, "province")
  city = value_as_string(payload, "city")
  adcode = value_as_string(payload, "adcode")
  rectangle = value_as_string(payload, "rectangle")
  return LocationSummary(
    region_key=region_from_parts(province, city, adcode),
    source="amap_ip",
    province=province,
    city=city,
    adcode=adcode,
    rectangle=rectangle
  )


def locate_by_regeo(longitude: float, latitude: float) -> LocationSummary:
  payload = request_amap("/v3/geocode/regeo", {
    "location": f"{longitude:.6f},{latitude:.6f}",
    "extensions": "base"
  })
  if payload is None or value_as_string(payload, "status") != "1":
    return fallback_location("amap_regeo_fallback")

  regeocode = payload.get("regeocode")
  if not isinstance(regeocode, dict):
    return fallback_location("amap_regeo_fallback")
  component = regeocode.get("addressComponent")
  if not isinstance(component, dict):
    return fallback_location("amap_regeo_fallback")

  province = value_as_string(component, "province")
  city = value_as_string(component, "city")
  adcode = value_as_string(component, "adcode")
  return LocationSummary(
    region_key=region_from_parts(province, city, adcode),
    source="amap_regeo",
    province=province,
    city=city,
    adcode=adcode,
    longitude=longitude,
    latitude=latitude
  )
