import morgan from "morgan";

morgan.token(
    "id",
    (req) => req.requestId
);

const format =
"[:id] :method :url :status :response-time ms";

export default morgan(format);