define({ "api": [
  {
    "type": "post",
    "url": "/search/",
    "title": "Search For Tickets",
    "name": "SearchTickets",
    "group": "Search",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.uid",
            "description": "<p>Firebase Auth User ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "body.oneWay",
            "description": "<p>Boolean Representing One Way/Round Trip</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.from",
            "description": "<p>Airport IATA Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.to",
            "description": "<p>Airport IATA Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.radiusFrom",
            "description": "<p>Radius around departure airport</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.radiusTo",
            "description": "<p>Radius around arrival airport</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body.departureWindow",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "body.departureWindow.start",
            "description": "<p>Start of departure window</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "body.departureWindow.end",
            "description": "<p>End of depparture window</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body.returnDepartureWindow",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "body.returnDepartureWindow.start",
            "description": "<p>Start of return departure window</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "body.returnDepartureWindow.end",
            "description": "<p>End of return departure window</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Structure-Example:",
          "content": "searchData: {\n  uid: \"abc123def456ghi789jkl\",\n  oneWay: false,\n  from: \"LAX\",\n  to: \"JFK\",\n  radiusFrom: \"100\",\n  radiusTo: \"100\",\n  departureWindow: {\n    start: new Date(),\n    end: new Date()\n  },\n  returnDepartureWindow: {\n    start: new Date(),\n    end: new Date()\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Response code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "tickets",
            "description": "<p>Tickets Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "tickets.data",
            "description": "<p>Array of tickets in tickets object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "remainingSearches",
            "description": "<p>User's remaining searches</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>Response code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/search.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "/verifynewuser/",
    "title": "Verify New User",
    "name": "VerifyNewUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>User's firebase AUTH user ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data object</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.code",
            "description": "<p>Response code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.message",
            "description": "<p>Response message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data object</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "data.code",
            "description": "<p>Response code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data.message",
            "description": "<p>Response message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/verifyNewUser.js",
    "groupTitle": "User"
  }
] });
