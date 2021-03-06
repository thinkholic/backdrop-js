import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { register as acRegister } from 'store/reducers/userSlice';

import Layout from 'components/Layout';

import { Wrapper, FormWrap } from './styled';

import FormFields from '../FormFields';

// TODO Improve validationSchema
const validationSchema = yup.object().shape({
  screenName: yup.string().required('* required'),
  userName: yup.string().required('* required'),
  email: yup.string().email('* invalid email address').required('* required'),
  password: yup.string().required('* required'),
  password_re: yup
    .string()
    .required('* required')
    .oneOf([yup.ref('password'), null], '* passwords must match'),
  role: yup.number().required('* required').positive().integer(),
});

const initialValues = {
  screenName: '',
  email: '',
  userName: '',
  password: '',
  password_re: '',
  role: 3,
};

export default function CreateUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const register = (user, cb) => dispatch(acRegister(user, cb));

  return (
    <Layout title="Users > Create a new user">
      <Wrapper>
        <FormWrap>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              register(values, (err) => {
                if (err) {
                  // TODO: Handle error
                } else {
                  // TODO Trigger and email and send user verification link
                  resetForm();
                  setSubmitting(false);
                  history.push('/users');
                }
              });
            }}
          >
            {(formikProps) => (
              <FormFields {...formikProps} submitText="Create" />
            )}
          </Formik>
        </FormWrap>
      </Wrapper>
    </Layout>
  );
}
