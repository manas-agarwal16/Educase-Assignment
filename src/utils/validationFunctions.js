// Name validation function - non-empty, no special characters , datatype - string, length limit.
const validSchoolName = (name) => {
  if (!name || typeof name !== "string") {
    return "School name must be a string.";
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    return "School name must be between 3 and 100 characters.";
  }
  if (!/^[a-zA-Z0-9 .-]+$/.test(name)) {
    return "School name can only contain letters, numbers, spaces, dots, and hyphens.";
  }
  return null; // No error
};

// Address validation function - non-empty, no special characters , datatype - string, length limit.
const validAddress = (address) => {
  if (!address || typeof address !== "string") {
    return "School address must be a string.";
  }
  if (address.trim().length < 3 || address.trim().length > 200) {
    return "School address must be between 3 and 200 characters.";
  }
  if (!/^[a-zA-Z0-9 .-]+$/.test(address)) {
    return "School address can only contain letters, numbers, spaces, dots, and hyphens.";
  }
  return null; // No error
};

// Coordinates validation function.
const validCoordinates = (longitude, latitude) => {
  if (
    isNaN(longitude) ||
    isNaN(latitude) ||
    longitude < -180 ||
    longitude > 180 ||
    latitude < -90 ||
    latitude > 90
  ) {
    return "Invalid latitude or longitude. Please enter valid coordinates.";
  }

  return null;
};

export { validAddress, validSchoolName, validCoordinates };
