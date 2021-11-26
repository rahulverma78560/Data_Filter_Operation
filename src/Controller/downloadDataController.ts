import { Request, Response } from "express";
import { createResponse } from "../Utility/response";
import { getGroup } from "../Manager/downloadDataManager";
const { parse } = require('json2csv');
import converter from 'json-2-csv'
import path from 'path'
import fs from 'fs'
export const downloadDataHandler = async (req: Request, res: Response) => {
  const name = req.params.name;
  getGroup(name)
    .then((getData) => {
      const a:any=[]
      a.push(getData)
      converter.json2csv( a, (err:any, csv:any) => {
        if (err) {
            throw err;
        }
        fs.writeFileSync(path.join("todo.csv"),csv);
    });
    return res.status(200).json(createResponse(200, getData));
    })
    .catch((err) => {
      return res.status(404).json(createResponse(404, err));
    });
};




