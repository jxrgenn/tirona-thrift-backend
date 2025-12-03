// Run this script with: node scripts/generate_logo.js
// Ensure process.env.API_KEY is set.

const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');
const path = require('path');

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function generateLogo() {
    console.log("Generating Logo with Gemini 3 Pro (Nano Banana Pro)...");

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview', // The "Nano Banana Pro" model
            contents: {
                parts: [
                    {
                        text: 'A brutalist, minimalist logo for "Tirona Thrift". High contrast black and lime green colors. Y3K aesthetic. Sharp angles. Vector style graphic. Simple and iconic.',
                    },
                ],
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: "1K"
                },
            },
        });

        // Extract image
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64Data = part.inlineData.data;
                const buffer = Buffer.from(base64Data, 'base64');
                const outputPath = path.join(__dirname, '..', 'logo_generated.png');
                
                fs.writeFileSync(outputPath, buffer);
                console.log(`Logo saved to: ${outputPath}`);
            }
        }
    } catch (error) {
        console.error("Error generating logo:", error);
    }
}

generateLogo();