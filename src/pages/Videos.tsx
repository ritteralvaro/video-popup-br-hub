
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  Edit, 
  ArrowUp, 
  ArrowDown,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { VideoUploader } from "@/components/videos/VideoUploader";
import { VideoModal } from "@/components/videos/VideoModal";

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  
  // Dados simulados para lista de vídeos
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Tour virtual da casa - Jardins",
      thumbnail: "https://placehold.co/320x180?text=Casa+Jardins",
      status: "active",
      views: 254,
      urls: ["https://imobiliaria.com.br/imoveis/casa-jardins"],
      uploadDate: "10/04/2025",
      order: 1,
    },
    {
      id: 2,
      title: "Conheça o novo modelo SUV",
      thumbnail: "https://placehold.co/320x180?text=SUV+Novo",
      status: "active",
      views: 187,
      urls: ["https://concessionaria.com.br/veiculos/suv-2025"],
      uploadDate: "08/04/2025",
      order: 2,
    },
    {
      id: 3,
      title: "Apartamento mobiliado - Centro",
      thumbnail: "https://placehold.co/320x180?text=Apto+Centro",
      status: "inactive",
      views: 103,
      urls: ["https://imobiliaria.com.br/imoveis/apto-centro-mobiliado"],
      uploadDate: "05/04/2025",
      order: 3,
    },
  ]);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.urls.some(url => url.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleDeleteVideo = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este vídeo?")) {
      setVideos(videos.filter(video => video.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, status: video.status === "active" ? "inactive" : "active" } 
        : video
    ));
  };

  const handleMoveOrder = (id: number, direction: "up" | "down") => {
    const videoIndex = videos.findIndex(v => v.id === id);
    if (
      (direction === "up" && videoIndex === 0) || 
      (direction === "down" && videoIndex === videos.length - 1)
    ) {
      return;
    }
    
    const reordered = [...videos];
    const targetIndex = direction === "up" ? videoIndex - 1 : videoIndex + 1;
    
    [reordered[videoIndex], reordered[targetIndex]] = 
    [reordered[targetIndex], reordered[videoIndex]];
    
    // Atualizar a ordem numérica
    const updatedVideos = reordered.map((v, idx) => ({
      ...v,
      order: idx + 1
    }));
    
    setVideos(updatedVideos);
  };

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Vídeos</h1>
              <p className="text-gray-600">Gerenciar vídeos para popup</p>
            </div>
            <Button onClick={() => setShowUploader(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Vídeo
            </Button>
          </div>

          {/* Filtro/Busca */}
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por título ou URL de destino..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Lista de Vídeos */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordem
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vídeo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visualizações
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URLs de Destino
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Upload
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                      <tr key={video.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-gray-700">{video.order}</span>
                            <div className="flex flex-col -space-y-1 mt-1">
                              <button 
                                onClick={() => handleMoveOrder(video.id, "up")}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                disabled={video.order === 1}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </button>
                              <button 
                                onClick={() => handleMoveOrder(video.id, "down")}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                disabled={video.order === videos.length}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-28">
                              <img
                                className="h-16 w-28 object-cover rounded"
                                src={video.thumbnail}
                                alt={video.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{video.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(video.id)}
                            className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
                              ${video.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {video.status === "active" ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Ativo
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Inativo
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="h-4 w-4 mr-1 text-gray-400" />
                            {video.views}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {video.urls.map((url, index) => (
                              <div key={index} className="truncate max-w-xs">
                                {url}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {video.uploadDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => setSelectedVideo(video)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        Nenhum vídeo encontrado.
                        {searchQuery ? (
                          <p className="mt-1">Tente ajustar sua busca.</p>
                        ) : (
                          <p className="mt-1">
                            Clique em "Adicionar Vídeo" para começar.
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal de Upload de Vídeo */}
        {showUploader && (
          <VideoUploader 
            onClose={() => setShowUploader(false)}
            onVideoUploaded={(video) => {
              setVideos([...videos, {
                ...video,
                id: videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1,
                order: videos.length + 1
              }]);
              setShowUploader(false);
            }}
          />
        )}

        {/* Modal de Edição de Vídeo */}
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            onSave={(updatedVideo) => {
              setVideos(videos.map(video => 
                video.id === updatedVideo.id ? updatedVideo : video
              ));
              setSelectedVideo(null);
            }}
          />
        )}
      </MainLayout>
    </AuthLayout>
  );
}
