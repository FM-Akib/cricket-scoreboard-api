
const { teamsCollection } = require('../models/collections');
const { ObjectId } = require('mongodb');

async function getAllTeams(req, res) {
  try {
    const result = await teamsCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
}

async function registerTeam(req, res) {
  try {
    const team = req.body;
    const query = { teamName: team.teamName };
    const exist = await teamsCollection.findOne(query);
    if (exist) {
      return res.status(400).json({ message: 'Team already exists' });
    }
    const result = await teamsCollection.insertOne(team);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register team', error });
  }
}

async function approveTeam(req, res) {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { approved: true } };
    const result = await teamsCollection.updateOne(filter, update);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve team', error });
  }
}


async function findATeam(req,res){
    try{
      const {id}= req.params();
      const result = await teamsCollection.findOne({_id:new ObjectId(id)});
      res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:'Failed to fetch team',error});
    }
}


async function updateTeam(req, res) {
    try{
       const {id}= req.params();
       const filter = { _id: new ObjectId(id) };
       const teamData  = req.body;
       const update = { $set: teamData };
       const result = await teamsCollection.updateOne(filter, update);

       if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Team not found or no changes made' });
       }
       res.status(200).json(result);
    }catch(err){
        res.status(500).json({message:'Failed to update team',error});
    }
}







module.exports = { getAllTeams, registerTeam, approveTeam, findATeam, updateTeam };
