type ShiftTimeTemplate = {
    startTime: string;
    endTime: string;
};

type ShiftDataStructure = {
    [location: string]: ShiftTimeTemplate[];
};

export const timeTemplate: ShiftDataStructure = {
    "Fremont": [
      { startTime: "05:30", endTime: "14:00" },
      { startTime: "13:30", endTime: "22:00" },
      { startTime: "21:30", endTime: "06:00" },
      { startTime: "18:00", endTime: "00:30" },
      { startTime: "00:00", endTime: "06:00" }
    ],
    "Livermore": [
      { startTime: "06:00", endTime: "14:30" },
      { startTime: "14:00", endTime: "22:30" },
      { startTime: "22:00", endTime: "06:30" }
    ],
    "Lathrop": [
      { startTime: "06:00", endTime: "14:30" },
      { startTime: "14:00", endTime: "22:30" },
      { startTime: "22:00", endTime: "06:30" }
    ],
    "GFTX": [
      { startTime: "03:00", endTime: "15:00" },
      { startTime: "05:30", endTime: "15:30" },
      { startTime: "17:45", endTime: "05:45" },
      { startTime: "18:00", endTime: "06:00" }
    ],
    "Kyle": [
      { startTime: "06:00", endTime: "17:30" },
      { startTime: "18:00", endTime: "05:30" }
    ]
  };
