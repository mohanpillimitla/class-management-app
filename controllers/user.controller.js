exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.studentBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.teacherBoard = (req, res) => {
    res.status(200).send("Teacher Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  