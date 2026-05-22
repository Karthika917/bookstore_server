const jobs = require('../Models/jobModel')

//add jobposts
exports.addJobPost = async(req,res)=>{
  try{
    const {title,location,jobType,salary,qualification,experience,description} = req.body
    const existingJob = await jobs.findOne({title:title,location:location})
    if(existingJob){
        res.status(400).json("Job already posted")
    }
    else{
        const newJob = new jobs({title,location,jobType,salary,qualification,experience,description})
        await newJob.save()
        res.status(200).json(newJob)
    }
  }
  catch(err){
      console.log(err)
      res.status(500).json(err)
  }
}

//list jobposts
exports.listJobPost = async(req,res)=>{
    try{
        const {search} = req.query
        console.log(search)
        let filter={}
        search ? filter = { title: {$regex: search, $options: 'i'}}:
        filter = {}
        const jobList = await jobs.find(filter)
        res.status(200).json(jobList)
    }
   catch(err){
    console.log(err)
    res.status(500).json(err)
   }
}

//delete jobpost
exports.deleteJobPost = async(req,res)=>{
    try{
        const {jid} = req.params
        const jobPost = await jobs.findByIdAndDelete(jid)
        res.status(200).json(jobPost)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

