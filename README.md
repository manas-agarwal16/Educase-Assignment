# Educase API

This API provides endpoints for adding schools and listing nearby schools based on user coordinates.

## Base URL
```
https://educase-assignment-1-bju1.onrender.com
```

## Endpoints

### 1. Add School
**Method:** `POST`  
**Endpoint:** `/addSchool`

#### Request
- **URL:**
  ```
  https://educase-assignment-1-bju1.onrender.com/addSchool
  ```
- **Headers:**
  ```json
  Content-Type: application/json
  ```
- **Body (JSON Example):**
  ```json
  {
    "name": "ABC School",
    "address": "123 Street, City, Country",
    "longitude": 77.5946,
    "latitude": 12.9716
  }
  ```

#### Response
- **Success (201 Created):**
  ```json
  {
    "status": 201,
    "data": {
      "id": 8,
      "name": "Manas Kumar Garg Engineering clg",
      "address": "Ghaziabad , UP , India",
      "latitude": 80.2233,
      "longitude": 28.67589825974092
    },
    "message": "School added successfully"
  }
  ```

### 2. List Schools
**Method:** `GET`  
**Endpoint:** `/listSchools/:userLongitude/:userLatitude`

#### Request
- **URL Format:**
  ```
  https://educase-assignment-1-bju1.onrender.com/listSchools/:userLongitude/:userLatitude
  ```
- **Example:**
  ```
  https://educase-assignment-1-bju1.onrender.com/listSchools/77.5946/12.9716
  ```

#### Response
- **Success (201 Created):**
  ```json
  {
    "status": 201,
    "data": [
      {
        "id": 3,
        "name": "Ajay Kumar Garg Engineering College",
        "address": "Ghaziabad , UP , India",
        "latitude": 77.50217528495834,
        "longitude": 28.67589825974092,
        "distance": 130.70836857144843
      },
      {
        "id": 6,
        "name": "Gulgotia University",
        "address": "Noida , UP , India",
        "latitude": 77.49776491952365,
        "longitude": 28.45723121577107,
        "distance": 5277.620491177296
      }
    ],
    "message": "Schools Fetched Successfully"
  }
  ```

## Notes
- Ensure all request parameters are correctly formatted.
- Replace `:userLongitude` and `:userLatitude` with actual numeric values.
- The `distance` field in the response represents the distance of each school from the provided coordinates.

