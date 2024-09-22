import AdminLoginForm from '@/components/AdminLoginForm';

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <AdminLoginForm />
        <p className="mt-4 text-sm text-gray-600">
          Don't have an admin account?{' '}
          {/* <Link href="/admin/register" className="text-blue-600 hover:underline">
            Register here
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
