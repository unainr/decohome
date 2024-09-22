import AdminRegisterForm from '@/components/AdminRegisterForm';

const AdminRegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Registration</h1>
        <AdminRegisterForm />
      </div>
    </div>
  );
};

export default AdminRegisterPage;
