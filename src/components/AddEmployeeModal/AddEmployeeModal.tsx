import { Box, Modal, styled, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addEmployee, editEmployeeDetails } from 'store/slices/employeeSlice';
import { useAppDispatch } from 'hooks';
import { FC } from 'react';
import { generateId } from 'utils/generateId';
import { Employee } from 'store/slices/types';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  padding: theme.spacing(4),
}));

type Props = {
  open: boolean;
  handleClose: () => void;
  employee?: Employee;
  isEditMode?: boolean;
};

const RelationshipType = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACTOR: 'CONTRACTOR',
};

export const AddEmployeeModal: FC<Props> = ({
  open,
  handleClose,
  employee,
  isEditMode,
}: Props) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    name: employee?.name || '',
    age: employee?.age || '',
    relationship: employee?.relationship || '',
    typeOfWork: employee?.typeOfWork || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .matches(/^[A-Za-z\s]+$/, 'Only ASCII English letters are allowed')
      .required('Name is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .min(18, 'Must be at least 18 years old')
      .max(60, 'Must be at most 60 years old')
      .required('Age is required'),
    relationship: Yup.string()
      .oneOf(Object.values(RelationshipType), 'Invalid relationship type')
      .required('Relationship is required'),
    typeOfWork: Yup.string()
      .matches(/^[a-zA-Z][a-zA-Z0-9]{2,254}$/, 'Invalid type of work')
      .required('Type of work is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    if (!isEditMode) {
      const newEmployee = { id: generateId(), ...values };
      dispatch(addEmployee(newEmployee));
    } else {
      const updatedEmployee = { id: employee.id, ...values };
      dispatch(editEmployeeDetails(updatedEmployee));
    }
    handleClose();
    resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                id="age"
                name="age"
                label="Age"
                type="number"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
                error={touched.age && Boolean(errors.age)}
                helperText={touched.age && errors.age}
              />
              <TextField
                fullWidth
                margin="normal"
                id="relationship"
                name="relationship"
                label="Relationship"
                select
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.relationship}
                error={touched.relationship && Boolean(errors.relationship)}
                helperText={touched.relationship && errors.relationship}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled hidden />
                {Object.values(RelationshipType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
              <TextField
                fullWidth
                margin="normal"
                id="typeOfWork"
                name="typeOfWork"
                label="Type of Work"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.typeOfWork}
                error={touched.typeOfWork && Boolean(errors.typeOfWork)}
                helperText={touched.typeOfWork && errors.typeOfWork}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '24px', padding: '10px' }}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </StyledBox>
    </Modal>
  );
};
