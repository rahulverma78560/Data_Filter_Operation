import express from 'express';
import {getFilterRecords} from "../Controller/controllers";

const router = express.Router();

router.get("/group", getFilterRecords);


export default router;