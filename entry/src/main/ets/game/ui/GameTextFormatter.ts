import { PieceType, SpecialType } from '../core/Types';
import { LevelGoal } from '../levels/LevelConfig';

export function brushColorValue(type: PieceType): string {
  if (type === 'red') {
    return '#F27A91';
  }
  if (type === 'blue') {
    return '#69B8EA';
  }
  if (type === 'yellow') {
    return '#EFC957';
  }
  if (type === 'green') {
    return '#76D37B';
  }
  if (type === 'purple') {
    return '#B487EF';
  }
  return '#F39967';
}

export function formatStars(stars: number): string {
  if (stars <= 1) {
    return '★☆☆';
  }
  if (stars === 2) {
    return '★★☆';
  }
  return '★★★';
}

export function specialGoalName(special?: SpecialType): string {
  if (special === 'row_clear') {
    return '左右消除果冻';
  }
  if (special === 'col_clear') {
    return '上下消除果冻';
  }
  if (special === 'bomb') {
    return '爆炸果冻';
  }
  if (special === 'rainbow') {
    return '彩虹果冻';
  }
  return '特殊果冻';
}

export function specialComboGoalName(comboType?: string): string {
  if (comboType === 'rainbow_functional') {
    return '彩虹+功能组合';
  }
  if (comboType === 'rainbow_color') {
    return '彩虹组合';
  }
  if (comboType === 'bomb_bomb') {
    return '双爆炸组合';
  }
  if (comboType === 'functional_combo') {
    return '功能果冻组合';
  }
  return '特殊组合';
}

export function pieceGoalName(type?: PieceType): string {
  if (type === 'red') {
    return '粉心果冻';
  }
  if (type === 'blue') {
    return '蓝晶果冻';
  }
  if (type === 'yellow') {
    return '星糖果冻';
  }
  if (type === 'green') {
    return '青叶果冻';
  }
  if (type === 'purple') {
    return '葡萄果冻';
  }
  if (type === 'orange') {
    return '橙光果冻';
  }
  return '指定果冻';
}

export function goalBadgeText(goal: LevelGoal): string {
  if (goal.type === 'score') {
    return '分';
  }
  if (goal.type === 'clear_ice') {
    return '冰';
  }
  if (goal.type === 'break_chain') {
    return '锁';
  }
  if (goal.type === 'clear_marshmallow') {
    return '棉';
  }
  if (goal.type === 'collect_special') {
    return '技';
  }
  if (goal.type === 'combo_goal') {
    return '连';
  }
  if (goal.type === 'special_combo_goal') {
    return '组';
  }
  return '收';
}

export function goalTitle(goal: LevelGoal): string {
  if (goal.type === 'score') {
    return '基础分';
  }
  if (goal.type === 'clear_ice') {
    return '清除冰层';
  }
  if (goal.type === 'break_chain') {
    return '破除锁链';
  }
  if (goal.type === 'clear_marshmallow') {
    return '清除棉花糖';
  }
  if (goal.type === 'collect_special') {
    return specialGoalName(goal.targetSpecial);
  }
  if (goal.type === 'combo_goal') {
    return `完成 x${Math.max(2, goal.comboLength ?? 2)} 连击`;
  }
  if (goal.type === 'special_combo_goal') {
    return specialComboGoalName(goal.comboType);
  }
  return `收集${pieceGoalName(goal.target)}`;
}

export function goalDetailText(goal: LevelGoal): string {
  if (goal.type === 'score') {
    return '达到后继续冲二星三星';
  }
  if (goal.type === 'collect_special') {
    return '生成或触发都能推进';
  }
  if (goal.type === 'combo_goal') {
    return '一次操作连续消除';
  }
  if (goal.type === 'special_combo_goal') {
    return '交换指定功能果冻';
  }
  if (goal.type === 'collect_piece') {
    return '消除指定颜色';
  }
  return '在附近消除推进';
}

export function goalAccentColor(goal: LevelGoal): string {
  if (goal.type === 'clear_ice') {
    return '#61B7EA';
  }
  if (goal.type === 'break_chain') {
    return '#B98345';
  }
  if (goal.type === 'clear_marshmallow') {
    return '#EE79B3';
  }
  if (goal.type === 'collect_special') {
    return '#F2B84B';
  }
  if (goal.type === 'combo_goal') {
    return '#79C96E';
  }
  if (goal.type === 'special_combo_goal') {
    return '#9F7CF1';
  }
  if (goal.type === 'collect_piece') {
    return brushColorValue(goal.target ?? 'red');
  }
  return '#F27A91';
}

export function goalRemainingText(goal: LevelGoal): string {
  if (goal.type === 'score') {
    return `${Math.max(0, goal.count)}`;
  }
  if (goal.count <= 0) {
    return '完成';
  }
  return `剩 ${Math.max(0, goal.count)}`;
}

export function describeGoals(goals: LevelGoal[]): string {
  return goals.map(goal => {
    if (goal.type === 'score') {
      return `目标分 ${goal.count}`;
    }
    if (goal.type === 'clear_ice') {
      return `清除冰层 ${Math.max(0, goal.count)}`;
    }
    if (goal.type === 'break_chain') {
      return `破除锁链 ${Math.max(0, goal.count)}`;
    }
    if (goal.type === 'clear_marshmallow') {
      return `清除棉花糖 ${Math.max(0, goal.count)}`;
    }
    if (goal.type === 'collect_special') {
      return `触发${specialGoalName(goal.targetSpecial)} ${Math.max(0, goal.count)}`;
    }
    if (goal.type === 'combo_goal') {
      return `连击 x${Math.max(2, goal.comboLength ?? 2)} ${Math.max(0, goal.count)} 次`;
    }
    if (goal.type === 'special_combo_goal') {
      return `触发${specialComboGoalName(goal.comboType)} ${Math.max(0, goal.count)} 次`;
    }
    return `收集 ${goal.target} ${Math.max(0, goal.count)}`;
  }).join(' / ');
}
