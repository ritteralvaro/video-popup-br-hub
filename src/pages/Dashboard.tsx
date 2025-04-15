
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { 
  Video, 
  BarChart3, 
  Eye, 
  HardDrive
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  // Dados simulados para o dashboard
  const stats = {
    totalVideos: 12,
    activeVideos: 8,
    totalViews: 2487,
    storage: {
      used: 2.4, // GB
      total: 10, // GB
      percentage: 24,
    },
  };

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Visão geral da sua conta e atividades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total de Vídeos */}
            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Vídeos</p>
                  <h3 className="text-3xl font-semibold text-gray-800">{stats.totalVideos}</h3>
                </div>
              </div>
            </Card>

            {/* Vídeos Ativos */}
            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Vídeos Ativos</p>
                  <h3 className="text-3xl font-semibold text-gray-800">{stats.activeVideos}</h3>
                </div>
              </div>
            </Card>

            {/* Total de Visualizações */}
            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Visualizações</p>
                  <h3 className="text-3xl font-semibold text-gray-800">{stats.totalViews}</h3>
                </div>
              </div>
            </Card>

            {/* Armazenamento */}
            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <HardDrive className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4 w-full">
                  <p className="text-sm font-medium text-gray-500">Armazenamento</p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {stats.storage.used} GB / {stats.storage.total} GB
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: `${stats.storage.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vídeos Recentes */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Vídeos Recentes</h3>
              <div className="space-y-4">
                {[
                  { id: 1, title: "Tour virtual da casa - Jardins", views: 254, date: "10/04/2025" },
                  { id: 2, title: "Conheça o novo modelo SUV", views: 187, date: "08/04/2025" },
                  { id: 3, title: "Apartamento mobiliado - Centro", views: 103, date: "05/04/2025" },
                ].map((video) => (
                  <div key={video.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4 className="font-medium">{video.title}</h4>
                      <p className="text-sm text-gray-500">Adicionado em {video.date}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Eye className="h-4 w-4 mr-1" />
                      {video.views}
                    </div>
                  </div>
                ))}
                <a
                  href="/videos"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center mt-2"
                >
                  Ver todos os vídeos
                </a>
              </div>
            </Card>

            {/* Visualizações Recentes */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Visualizações por Dia</h3>
              <div className="h-64 flex items-end space-x-2">
                {[65, 42, 78, 95, 80, 125, 160].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${(value / 160) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">
                      {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-right">
                <a
                  href="/analytics"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end"
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Ver análises completas
                </a>
              </div>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
}
