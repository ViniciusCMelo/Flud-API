import {db} from "../database/connection";
import {Request, Response} from "express";
import User from "../model/User";

export default {
  async create (request: Request, response: Response) {
      const {
          id,
          name,
          email,
          profilePictureUrl
      } = request.body;
      const user = new User(id,name,email,profilePictureUrl);
      await db.collection("users").doc(user.id).set({
          name: user.name,
          email: user.email,
          profilePictureUrl: user.profilePictureUrl,
          city: user.city,
          state: user.state,
      });
      return response.status(201).json(user);
  }
};
