import axios from "axios"

test("Should buy a ticket ", async () => {
  const input = {
    eventId: '81a2bc5d-d7de-4ec2-90d1-9cf3737f4f02',
    email: "jhon.doe@gmail.com",
    creditCardToken: "9898273421"
  }
 const response = await axios.post("http://localhost:3000/purchase_ticket", input);
 const output = response.data;
 console.log('output', output)
 expect(output.ticketId).toBeDefined();
})