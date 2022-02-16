export const getImgs = async() => {
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

  let jobImgsComplete = []
  jobsData.map(job => {
    let newImgComplete = {
      name: job.job,
      imgMain: jobsImgs.find(img => img.includes(job.job)),
      frame: jobsFrames.find(frame => frame.includes(job.rarity))
    }
    jobImgsComplete.push(newImgComplete)
  })

  console.log('x', jobImgsComplete)
}
