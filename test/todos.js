import request from "request"

// Schema
// text: String,
// type: String,

const action = "create"
const id = ""
const port = 8000

switch (action) {
    
    case "create":
      console.log("create")
      request.post(
        `http://localhost:${port}/todos/`,
        { json: { text: "Test todo 1", type: ""}  },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
            else {
              console.log(error)
            }
        }
      )
      break
}


// library.method(placeItsGoingTo, Somedata) then something happens
// request.method(place, { json: {} }, callback)
// axios.method(place, {}).then(callback)
// request.post(`http://localhost:${port}/products/${id}`, { json: product }, () => {})