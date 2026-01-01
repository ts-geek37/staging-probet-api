import cors from "cors";

 const installCORS = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowedOrigins = ["http://localhost:3000"];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export default installCORS;