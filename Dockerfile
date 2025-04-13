# Use official MongoDB image
FROM mongo:7.0

# Optional: copy initialization scripts
COPY ./init /docker-entrypoint-initdb.d/

# Default MongoDB port
EXPOSE 27017