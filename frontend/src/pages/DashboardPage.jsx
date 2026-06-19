import ProtectedLayout from "../layouts/ProtectedLayout";

export default function DashboardPage() {
  return (
    <ProtectedLayout>

      <h1>
        Dashboard
      </h1>

      <button>
        Create Project
      </button>

      <button>
        Open Existing Project
      </button>

    </ProtectedLayout>
  );
}