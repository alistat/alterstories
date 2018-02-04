"use strict";

export function canI(user, action) {
  if (!user) return false;
  return user.capabilities[action]
}

export function expandCapabilities(caps) {
  caps['view-users'] = caps['view-users'] || caps['manage-users'];
  caps['view-roles'] = caps['view-roles'] || caps['manage-roles'];
  caps['view-users-roles'] = caps['view-users'] || caps['view-roles'];
  return caps;
}
