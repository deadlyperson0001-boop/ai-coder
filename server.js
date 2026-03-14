import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// These will come from environment variables (not stored in code)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

app.post("/generate-code", async (req, res) => {

  const prompt = req.body.prompt;

  const generatedCode = `
// Example Generated Code
function hello(){
    console.log("Hello from AI Coder");
}
hello();
`;

  await fetch(`${SUPABASE_URL}/rest/v1/prompts`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      response: generatedCode
    })
  });

  res.json({ code: generatedCode });

});

app.listen(3000, () => {
  console.log("AI server running");
});
