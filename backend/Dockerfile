# ========== Stage 1: Build ==========
FROM golang:1.24-alpine AS builder

# Install git (needed for go mod download)
RUN apk add --no-cache git

WORKDIR /app

# Copy go mod files first for caching dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the Go app (statically)
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# ========== Stage 2: Run ==========
FROM alpine:latest

WORKDIR /app

# Copy built binary from builder stage
COPY --from=builder /app/server .

# Expose your server port (adjust if different)
EXPOSE 8080

# Run binary
CMD ["./server"]
