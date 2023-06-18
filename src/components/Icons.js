export const locationIcon = (size = 24, color = "#4b5563", fill = "none") => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <g fill={fill} stroke={color} strokeLinejoin="round" strokeWidth="2">
        <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
        <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
      </g>
    </svg>
  );
};

export const salaryIcon = (
  size = 24,
  color = "currentColor",
  fill = "#4b5563"
) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M6 11a1 1 0 1 0 1 1a1 1 0 0 0-1-1Zm12 0a1 1 0 1 0 1 1a1 1 0 0 0-1-1Zm2-6H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1Zm-9-7a3 3 0 1 0 3 3a3 3 0 0 0-3-3Zm0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z"
      />
    </svg>
  );
};

export const jobTypeIcon = (
  size = 18,
  color = "currentColor",
  fill = "#4b5563"
) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Zm-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.19 1.19 0 0 0 9 14h6a1.19 1.19 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
      />
    </svg>
  );
};

export const applicationTypeIcon = (
  size = 18,
  color = "#4b5563",
  fill = "none"
) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={fill}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"
      />
    </svg>
  );
};

export const deadlineIcon = (
  size = 24,
  color = "currentColor",
  fill = "#4b5563"
) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
      />
    </svg>
  );
};

export const clockIcon = (
  size = 18,
  color = "currentColor",
  fill = "#4b5563"
) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <g
        fill={fill}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M11 8v5h5" />
      </g>
    </svg>
  );
};

export const settingIcon = (size = 24, color = "#4b5563", fill = "none") => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <g
        fill={fill}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M41.5 10H35.5" />
        <path d="M27.5 6V14" />
        <path d="M27.5 10L5.5 10" />
        <path d="M13.5 24H5.5" />
        <path d="M21.5 20V28" />
        <path d="M43.5 24H21.5" />
        <path d="M41.5 38H35.5" />
        <path d="M27.5 34V42" />
        <path d="M27.5 38H5.5" />
      </g>
    </svg>
  );
};

export const crossIcon = (size = 15, color = "#4b5563", fill = "currentColor") => {
  return (
    <svg
       width={size}
      height={size}
      viewBox="0 0 15 15"
    >
      <path
        fill={fill}
        d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z"
      />
    </svg>
  );
};
