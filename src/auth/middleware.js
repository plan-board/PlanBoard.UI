export const permissions = [
  {
    roleId: "HOD",
    permission: [
      "dashboard",
      "national",
      "zone",
      "depot",
      "territory",
      "dealer",
      "dashscheduleboard",
      "customer-potential",
      "change-password",
      "pre-journey-plan",
    ],
  },
  {
    roleId: "ZM",
    permission: [
      "zone",
      "depot",
      "territory",
      "dealer",
      "dashscheduleboard",
      "customer-potential",
      "change-password",
      "pre-journey-plan",
    ],
  },
  {
    roleId: "DM",
    permission: [
      "depot",
      "territory",
      "dealer",
      "dashscheduleboard",
      "customer-potential",
      "change-password",
      "pre-journey-plan",
    ],
  },
  {
    roleId: "TM",
    permission: ["territory", "dealer", "dashscheduleboard", "change-password"],
  },
  {
    roleId: "AM",
    permission: [
      "territory",
      "dealer",
      "dashscheduleboard",
      "customer-potential",
      "change-password",
      "pre-journey-plan",
    ],
  },
];

const zonepermision = [
  {
    roleId: 1,
    permissions: [1, 2, 3, 4],
  },
];
export function hasPermission(roleId, permissionToCheck) {
  const role = permissions.find((role) => {
    return role.roleId === roleId;
  });
  if (role) {
    return role.permission.includes(permissionToCheck);
  }
  return false;
}

export function rolePermission() {
  const roleId = parseInt(localStorage.getItem("roleId"));

  const role = zonepermision.find((role) => {
    return role.roleId === 1;
  });
  return role;
}

export const zoneData = [
  {
    id: 1,
    name: "North",
  },
  {
    id: 2,
    name: "South",
  },
  {
    id: 3,
    name: "East",
  },
  {
    id: 4,
    name: "West",
  },
  {
    id: 5,
    name: "Other",
  },
];
export const Territoty = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Ambala",
  },
  {
    id: 3,
    name: "Delhi-Naraina",
  },
  {
    id: 4,
    name: "Jalandhar",
  },
];
