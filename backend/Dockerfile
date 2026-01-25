# ---- Build Stage ----
FROM golang:1.24-bullseye AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o server main.go

# ---- Runtime Stage ----
FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/server .
COPY --from=builder /app/auth ./auth
COPY --from=builder /app/db ./db
COPY --from=builder /app/handlers ./handlers
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/models ./models

EXPOSE 8080
CMD ["./server"]
