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


def rectangle_center(rectangle: str | None) -> tuple[float, float] | None:
  if not rectangle:
    return None
  try:
    first, second = rectangle.split(";")
    first_lng, first_lat = [float(item) for item in first.split(",")]
    second_lng, second_lat = [float(item) for item in second.split(",")]
    return ((first_lng + second_lng) / 2, (first_lat + second_lat) / 2)
  except ValueError:
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


def request_amap_image(path: str, params: dict[str, str]) -> bytes | None:
  if not amap_enabled():
    return None
  query = {**params, "key": settings.amap_web_service_key.strip()}
  url = urljoin(settings.amap_web_service_base_url.rstrip("/") + "/", path.lstrip("/"))
  try:
    with httpx.Client(timeout=3.0) as client:
      response = client.get(url, params=query)
      response.raise_for_status()
      content_type = response.headers.get("content-type", "")
      if "image" in content_type.lower():
        return response.content
  except httpx.HTTPError:
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
  center = rectangle_center(rectangle)
  return LocationSummary(
    region_key=region_from_parts(province, city, adcode),
    source="amap_ip",
    province=province,
    city=city,
    adcode=adcode,
    rectangle=rectangle,
    longitude=center[0] if center else None,
    latitude=center[1] if center else None
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


def static_map_image(
  center_longitude: float | None,
  center_latitude: float | None,
  markers: list[tuple[float, float, str]]
) -> bytes | None:
  longitude = center_longitude
  latitude = center_latitude
  if (longitude is None or latitude is None) and markers:
    longitude = sum(marker[0] for marker in markers) / len(markers)
    latitude = sum(marker[1] for marker in markers) / len(markers)
  if longitude is None or latitude is None:
    longitude = 116.397428
    latitude = 39.90923

  params: dict[str, str] = {
    "location": f"{longitude:.6f},{latitude:.6f}",
    "zoom": "11",
    "size": "640*360",
    "scale": "2"
  }
  marker_items: list[str] = []
  for index, marker in enumerate(markers[:10]):
    label = marker[2][:1].upper() if marker[2] else str(index + 1)
    marker_items.append(f"mid,0xFF4F9A,{label}:{marker[0]:.6f},{marker[1]:.6f}")
  if marker_items:
    params["markers"] = "|".join(marker_items)
  return request_amap_image("/v3/staticmap", params)
