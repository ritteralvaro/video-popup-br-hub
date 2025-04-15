
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/card";
import { Calendar, Eye, TrendingUp } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

export default function Analytics() {
  // Dados simulados para análises
  const viewsData = [
    { name: "01/04", views: 65 },
    { name: "02/04", views: 42 },
    { name: "03/04", views: 78 },
    { name: "04/04", views: 95 },
    { name: "05/04", views: 80 },
    { name: "06/04", views: 125 },
    { name: "07/04", views: 160 },
    { name: "08/04", views: 143 },
    { name: "09/04", views: 158 },
    { name: "10/04", views: 175 },
    { name: "11/04", views: 190 },
    { name: "12/04", views: 185 },
    { name: "13/04", views: 210 },
    { name: "14/04", views: 235 },
  ];

  const videoPerformanceData = [
    { name: "Tour virtual da casa - Jardins", views: 254, value: 254 },
    { name: "Conheça o novo modelo SUV", views: 187, value: 187 },
    { name: "Apartamento mobiliado - Centro", views: 103, value: 103 },
    { name: "Casa de praia - Litoral", views: 85, value: 85 },
    { name: "Apresentação do Sedan 2025", views: 76, value: 76 },
  ];

  const COLORS = ["#3498db", "#2ecc71", "#9b59b6", "#e74c3c", "#f1c40f"];

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Análises</h1>
            <p className="text-gray-600">Estatísticas e desempenho dos seus vídeos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Estatísticas Resumidas */}
            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Visualizações</p>
                  <h3 className="text-3xl font-semibold text-gray-800">2.487</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Média Diária</p>
                  <h3 className="text-3xl font-semibold text-gray-800">178</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Visualizações Hoje</p>
                  <h3 className="text-3xl font-semibold text-gray-800">235</h3>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Visualizações */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Visualizações nos Últimos 14 Dias</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} visualizações`, "Visualizações"]} />
                    <Bar dataKey="views" fill="#3498db" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Gráfico de Desempenho dos Vídeos */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Visualizações por Vídeo</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={videoPerformanceData}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {videoPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} visualizações`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Desempenho dos Vídeos</h3>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vídeo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visualizações
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Média Diária
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crescimento
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {videoPerformanceData.map((video, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{video.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{video.views}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{Math.round(video.views / 14)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`flex items-center text-sm ${
                          index % 2 === 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          <TrendingUp className={`h-4 w-4 mr-1 ${
                            index % 2 === 0 ? "text-green-600" : "text-red-600 transform rotate-180"
                          }`} />
                          {index % 2 === 0 ? "+" : "-"}{Math.floor(Math.random() * 15) + 5}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
}
