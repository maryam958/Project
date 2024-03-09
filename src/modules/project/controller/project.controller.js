import qDB from "../../../../DB/connection.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import { sendEmail } from "../../../services/sendEmail.js";

// Admin Actions
export const AddProject = asyncHandler(async (req, res, next) => {
  let {
    name,
    description,
    start_date,
    due_date,
    note_to_client,
    status,
    assign_technicians,
  } = req.body;
  const validStatusOptions = [
    "Open",
    "In Progress",
    "Completed",
    "Closed",
    "Rejected",
  ];
  if (
    status &&
    !validStatusOptions
      .map((opt) => opt.toLowerCase())
      .includes(status.toLowerCase())
  ) {
    return res.json({ message: "Invalid status" });
  }
  qDB.execute(
    `INSERT INTO projects(name,description,start_date,due_date,note_to_client,status,assign_technicians) VALUES 
    ('${name}','${description}','${start_date}','${due_date}','${note_to_client}','${status}','${assign_technicians}')`,
    (err, result) => {
      if (err) {
        res.json({ message: "sql error", err });
      } else {
        res.json({ message: "Done", result });
      }
    }
  );
});

export const UpdateProject = (req, res) => {
  let { id } = req.params;
  let {
    name,
    description,
    start_date,
    due_date,
    note_to_client,
    status,
    assign_technicians,
  } = req.body;

  if (isNaN(id)) {
    return res.json({ message: "Invalid ID" });
  }
  const validStatusOptions = [
    "Open",
    "In Progress",
    "Completed",
    "Closed",
    "Rejected",
  ];
  if (
    status &&
    !validStatusOptions
      .map((opt) => opt.toLowerCase())
      .includes(status.toLowerCase())
  ) {
    return res.json({ message: "Invalid status" });
  }

  let selectQuery = `SELECT id FROM projects WHERE id='${id}'`;

  qDB.execute(selectQuery, (selectErr, selectResult) => {
    if (selectErr) {
      console.error(selectErr);
      return res.json({ message: "SQL error", error: selectErr });
    }

    if (selectResult.length === 0) {
      return res.json({ message: "ID does not exist" });
    }

    let updateFields = [];
    if (name !== undefined) updateFields.push(`name='${name}'`);
    if (description !== undefined)
      updateFields.push(`description='${description}'`);
    if (start_date !== undefined)
      updateFields.push(`start_date='${start_date}'`);
    if (due_date !== undefined) updateFields.push(`due_date='${due_date}'`);
    if (note_to_client !== undefined)
      updateFields.push(`note_to_client='${note_to_client}'`);
    if (status !== undefined) updateFields.push(`status='${status}'`);
    if (assign_technicians !== undefined)
      updateFields.push(`assign_technicians='${assign_technicians}'`);

    if (updateFields.length === 0) {
      return res.json({ message: "No fields to update" });
    }

    let updateQuery = `UPDATE projects SET ${updateFields.join(
      ", "
    )} WHERE id='${id}'`;

    qDB.execute(updateQuery, (updateErr, result) => {
      if (updateErr) {
        console.error(updateErr);
        return res.json({ message: "SQL error", error: updateErr });
      } else {
        return res.json({ message: "Done", result });
      }
    });
  });
};

export const DeleteProject = (req, res) => {
  let { id } = req.params;
  qDB.execute(`DELETE FROM projects WHERE id=${id}`, (err, result) => {
    if (err) {
      res.json({ message: "sql error", err });
    } else {
      if (result.affectedRows) {
        res.json({ message: "Done", result });
      } else {
        res.json({ message: "Invalid project id" });
      }
    }
  });
};

export const getAllProjects = asyncHandler(async (req, res, next) => {
  qDB.execute(`select * from projects`, (err, result) => {
    if (err) {
      res.json({ message: "sql error", err });
    } else {
      res.json({ message: "Done", result });
    }
  });
});

export const ChangeStatus = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  let { status } = req.body;
  const validStatusOptions = [
    "Open",
    "In Progress",
    "Completed",
    "Closed",
    "Rejected",
  ];
  if (
    status &&
    !validStatusOptions
      .map((opt) => opt.toLowerCase())
      .includes(status.toLowerCase())
  ) {
    return res.json({ message: "Invalid status" });
  }
  qDB.execute(
    `UPDATE projects SET status='${status}' WHERE id='${id}'`,
    (err, result) => {
      console.log(err);
      if (err) {
        res.json({ message: "sql error", err });
      } else {
        res.json({ message: "Done", result });
      }
    }
  );
});



//Technicians Actions
export const ViewAssignedProjects = asyncHandler(async (req, res, next) => {
  const technicianId = req.user.id; 
  qDB.execute(`SELECT * FROM projects WHERE assign_technicians = '${technicianId}'`, (error, result) => {
    if (error) {
      res.json({ message: "sql error", error });
    } else {
      if (result.length === 0) {
        res.json({ message: "no projects found" });
      } else {
        res.status(200).json(result);
      }
    }
  }); 
});




// common Action (Admin ,Technician)
export const search = (req, res) => {
  const { name, due_date, created_at, status } = req.body;
  let query = "SELECT * FROM projects WHERE ";
  let conditions = [];

  if (name) {
      conditions.push(`name = '${name}'`);
  }
  if (due_date) {
      conditions.push(`due_date = '${due_date}'`);
  }
  if (created_at) {
      conditions.push(`created_at = '${created_at}'`);
  }
  if (status) {
      conditions.push(`status = '${status}'`);
  }

  if (conditions.length > 0) {
      query += conditions.join(" AND ");
  } else {
    res.json({message:"please enter your search word"})
  }

  qDB.execute(query, (err, result) => {
      if (err) {
          res.json({ message: "sql error", err });
      } else {
          res.json({ message: "Done", result });
      }
  });
};






export const clientEmail = asyncHandler(async (req, res, next) => {
  let {projectId}=req.params
  qDB.execute(`select * from projects where id='${projectId}'`, (err, result) => {
    if (err) {
      res.json({ message: "SQL Error", err });
    } else {
      if (result.length > 0) {
        const clientEmail = result[0].email;
        // Send the client's email in the response
        res.json({message:"Done",result});
      } else {
        res.json({ message: "Client not found." });
      }
    }
  });
});

export const checkStartDate = asyncHandler(async (req, res, next) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

  const start_date_projs = qDB.execute(`
   SELECT * FROM projects left JOIN clients ON projects.client = clients.id 
   WHERE projects.start_date = '${currentDate}'`, (err, result) => {
    if (err) {
      res.json({ message: "SQL Error", err });
    } else {
      if (result.length > 0) {
        for (const project of result) {
          const email = project.email;
          const projectId = project.id;
          const message = `<a href="http://localhost:3000/api/v1/project/clientEmail/${projectId}">This is the client email</a>`;
          sendEmail(email,"Client Email",message);
        }
      }

      res.json({ message: "Done", result });
    }
  });
});
