## Endpoint
`POST /trampoline/availability`

Checks slot capacity, pricing, and availability for a specified date, time window, and ticket count.

## Request

### Headers
* `Content-Type: application/json`

### Body Parameters
```json
{
    "date": "2026-07-13",
    "startTime": "14:00:00",
    "endTime": "15:00:00",
    "tickets": 2
}
```

| Field | Type | Required | Format | Description |
| :--- | :--- | :--- | :--- | :--- |
| `date` | String | Yes | `YYYY-MM-DD` | Booking date |
| `startTime` | String | Yes | `HH:mm:ss` | Requested start time |
| `endTime` | String | Yes | `HH:mm:ss` | Requested end time |
| `tickets` | Integer | Yes | `int` | Number of tickets requested |

## Response

### Status Code
* `200 OK`

### Body Schema
```json
{
    "data": {
        "slot_no": 6,
        "start_time": "14:00:00",
        "end_time": "15:00:00",
        "max_capacity": 100,
        "current_occupancy": 0,
        "remaining_seats": 100,
        "is_available": true,
        "per_ticket_price": 300
    }
}
```