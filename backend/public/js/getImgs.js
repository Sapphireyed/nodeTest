export const getImgs = async() => {
  // get all jobs and all job imgs
  let jobsData = await fetch('http://127.0.0.1:3000/api/v1/jobs').then(function(response) {
    return response.json();
  });
  jobsData = jobsData.data.jobs
  let jobsImgsAll = await fetch('http://127.0.0.1:3000/api/v1/imgs').then(function(response) {
    return response.json();
  })
  let jobsImgs = jobsImgsAll.data.jobsImgs
  let jobsBgs = jobsImgsAll.data.jobsBgs
  let jobsFrames = jobsImgsAll.data.jobsFrames

  // jobImgsComplete will hold img, bg and frame
  // sortableto sort stats to decide on bg
  let jobImgsComplete = []
  let sortable = []
  // map all jobs to adjust frame based on rarity
  jobsData.map(job => {
    let newImgComplete = {
      name: job.job,
      imgMain: jobsImgs.find(img => img.split('.')[0] === job.job),
      frame: jobsFrames.find(frame => frame.includes(job.rarity))
    }
    jobImgsComplete.push(newImgComplete)

      // get backgrounds based on statistics
    // const jobStats = {
    //   name: job.job,
    //   hp: job.hp / 5,
    //   str: job.strength / 1,
    //   agi: job.agility / 1,
    //   int: job.intelligence / 1,
    // }

  })
  return jobImgsComplete
}

export const buildImg = async() => {
  let jobImgsComplete = await getImgs()
  console.log(jobImgsComplete)
}