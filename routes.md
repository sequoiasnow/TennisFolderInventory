# Application Api Routes

> Defines the functionality of the app in terms of the api which
> is accessible. This outlines an entire Api spec, subject to change
> but a starting point.

The Api concerns itself with three distinct pieces of data. **The Leagues**
which define what matches can be edited. Then there is **The Setup** which
contains information about the current leagues times, and location of slots.
Finally their are **the time slots** which each associate with a league
and each of which have a date, corresponding morning, midday or evening time,
and a status.

## The Leagues

The content of the leagues is not to be edited by the client, thus
this route is purely a read request, no writing functionality included.

```http
GET /api/v1/venues/leagues
```

If successful the response will return the following:

```json
{
    ...,
    "data": [
        {
           "id": 5,
           "name": "Adult 40 & Over",
           "description": "Optional description of the league"
        },
        ...
    ]
}
```

## The Setup

The setup includes a brief summary view from which one can edit the available
times and other meta information. A query must have the following parameters.

| Parameter | Description                              |
|:---------:|:-----------------------------------------|
| type      | The id of the currently selected type.   |

```http
GET /api/v1/venues/setup?type=46
```

If the league exists the response will be as follows. The time duration is
in minutes. The title is repeated here for simplicity, but it may be left
out for brevity in early versions.

```json
{
    ...,
    "data": {
        "type": 46,
        "affiliationId": 860,
        "duration": 180,
        "timeRanges": {
            "morning": "9:00 AM",
            "midday": "1:00 PM",
            "evening": "6:00 PM"
        },
        "count": 4,
        "start": 1484085407
    }
}
```

If the record does not exist, the data simply returns all existing defaults.
Some fields will not be passed such as time ranges.

```json
{
    ...,
    "data": {
      "type": 46,
      "affiliationId": 860,
      "duration": 180,
      "count": 3,
      "start": 1484085407
    }
}
```

---

As this data is also saved to the host, it is created with a post request.

```http
POST /api/v1/venues/setup/
```

The data sent is **identical** to that received.

```json
{
  "type": 46,
  "affiliationId": 860,
  "duration": 180,
  "timeRanges": {
      "morning": "9:00 AM",
      "midday": "1:00 PM",
      "evening": "6:00 PM"
  },
  "count": 4,
  "start": 1484085407
}
```
The response from the server, returns all fields.

## The time slots

Arguably the most complex element of the arrangement, are the time slots.
The time slots occur on a certain day, at a certain time, morning, midday
or evening. When a time slot is clicked, it inserts itself into the
database using a post request. When it is unchecked, it removes itself
using a delete request.

```http
GET /api/v1/venues/slots?type=5&affiliationId=860
```

This returns all slots for the current league, given as type. And the
appropriate affiliation, passed as affiliationId.


This may return something as follows:

```json
{
    ...,
    "data": [
        {
            "type": 5,
            "affiliationId": 860,
            "venueId": 1,
            "status": 1,
            "start": 1484250770,
            "slot": 2,
            "stage": 2
        },
        ...
    ]
}
```

The start time is given as the unix timestamp when the slot begins.
This must be broken down into the date, no hours or minute information.

The slot is equivalent to part of the `timeRanges` array. Values could
include `morning`, `midday`, and `evening` and later other less distinct
time slots.

The status field can be a variety of things.

| Status | Description            |
|:------:|:-----------------------|
| 0      | Deleted, never seen    |
| 1      | Active and Available   |
| 4      | Allocated/Used         |

When allocated or used the slot should be disabled, so the club manager
does not override a time already being used by a team.

The status key corresponds to the location in row of available slots. This may
not be absolutely necessary but greatly simplifies implementation.

---

```http
POST /api/v1/venues/slots
```

The data sent to the server might look as follows.

```json
{
    "start": 1484250770,
    "slot": 3,
    "type": 46,
    "affiliationId": 860,
    "stage": 3
}
```

And would return the following:

```json
{
    "data": {
        "venueid": 4,
        ...
    }
}
```

This allows a delete request for that specific id to occur.

---

When a time slot becomes unselected, it may send a delete
request removing itself from the record.

```http
DELETE /api/v1/venues/slots/:id
```

A status of 200 will indicate success, all others, a failure
will leave the box clicked.
