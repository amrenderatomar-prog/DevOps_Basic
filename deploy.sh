echo "Checking Docker..."

if ! command -v docker &> /dev/null
then
  echo "Docker not installed"
  exit 1
fi

if ! command -v docker-compose &> /dev/null
then
  echo "Docker Compose not installed"
  exit 1
fi

echo "Docker present"

echo "Cleaning old containers..."
docker-compose down -v

echo "Starting system..."
docker-compose up --build -d

echo "Waiting for services..."
sleep 15

echo "Checking health..."

if docker ps | grep healthy
then
  echo "All services healthy"
  echo "[SUCCESS] Application live at http://localhost"
else
  echo "Services not healthy"
fi
