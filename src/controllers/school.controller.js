import { ApiResponse } from "../utils/ApiResponse.js";
import PrismaClientPkg from "@prisma/client";
import {
  validAddress,
  validSchoolName,
  validCoordinates,
} from "../utils/validationFunctions.js";

const { PrismaClient } = PrismaClientPkg;
const prisma = new PrismaClient();

const AddSchool = async (req, res) => {
  let { name, address, latitude, longitude } = req.body;

  // Name validation
  const nameError = validSchoolName(name);
  if (nameError) {
    return res.status(400).json(new ApiResponse(400, {}, nameError));
  }

  //Address validation.
  const addressError = validAddress(address);
  if (addressError) {
    return res.status(400).json(new ApiResponse(400, {}, addressError));
  }

  // longitude and latitude type casting to Number
  longitude = Number(longitude);
  latitude = Number(latitude);

  // Longitude and Latitude Validation.
  const coordinatesError = validCoordinates(longitude, latitude);
  if (coordinatesError) {
    return res.status(400).json(new ApiResponse(400, {}, coordinatesError));
  }

  // Check for if school already exists
  try {
    const schoolAlreadyExists = await prisma.School.findFirst({
      where: {
        name,
        longitude,
        latitude,
      },
    });

    if (schoolAlreadyExists) {
      return res
        .status(409)
        .json(new ApiResponse(409, {}, "School is already registered"));
    }
  } catch (error) {
    console.error(
      `Error occurred while verifying if the school already exists : ${error}`
    );

    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          "Error occurred while verifying if the school already exists."
        )
      );
  }

  // Adding new school to database.
  try {
    const newSchool = await prisma.School.create({
      data: {
        name,
        address,
        latitude,
        longitude,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newSchool, `School added successfully`));
  } catch (error) {
    console.error(`Error in adding new school to the database : ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "Error in adding new school to database")
      );
  }
};

const ListSchools = async (req, res) => {
  let { userLongitude, userLatitude } = req.params;

  // Type Casting to Number
  userLongitude = Number(userLongitude);
  userLatitude = Number(userLatitude);

  // Longitude and Latitude Validation
  const coordinatesError = validCoordinates(userLongitude, userLatitude);
  if (coordinatesError) {
    return res.status(400).json(new ApiResponse(400, {}, coordinatesError));
  }

  try {
    // Fetching School List sorted by the geographical distance.
    const schoolsList = await prisma.$queryRaw`
      SELECT *, 
        ST_Distance_Sphere(
          POINT(longitude, latitude), 
          POINT(${userLongitude}, ${userLatitude})
        ) AS distance
      FROM School
      ORDER BY distance ASC;
    `;

    return res
      .status(201)
      .json(new ApiResponse(201, schoolsList, "Schools Fetched Successfully"));
  } catch (error) {
    console.error(`Error in Fetching Schools : ${error}`);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Error in Fetching Schools"));
  }
};

export { AddSchool, ListSchools };
