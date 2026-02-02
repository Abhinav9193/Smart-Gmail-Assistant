# Use official Java 17 JDK image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# Render requires an exposed port
EXPOSE 8080

# Run any jar generated inside target and bind to Render's port
CMD ["sh", "-c", "java -jar target/*.jar --server.port=$PORT"]
