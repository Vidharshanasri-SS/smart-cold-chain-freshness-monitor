let sensorData = {
  temperature: 0,
  humidity: 0,
  mq135: 0,
  sgp40: 0,
  foodStatus: "Unknown",
  updatedAt: new Date().toISOString(),
};

// Receive data from ESP32
export async function POST(request: Request) {
  try {
    const body = await request.json();
 
    sensorData = {
      temperature: body.temperature,
      humidity: body.humidity,
      mq135: body.mq135,
      sgp40: body.sgp40,
      foodStatus: body.foodStatus,
      updatedAt: new Date().toISOString(),
    };

    console.log("Sensor Data:", sensorData);

    return Response.json({
      success: true,
      message: "Data received successfully",
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Invalid data",
      },
      { status: 400 }
    );
  }
}

// Send latest data to Dashboard
export async function GET() {
  return Response.json(sensorData);
}
