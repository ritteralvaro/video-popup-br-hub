
import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  X, Upload, FileVideo, AlertTriangle, 
  Check, RefreshCw, Link, Plus, Trash2 
} from "lucide-react";
import { useDropzone } from "react-dropzone";

interface VideoUploaderProps {
  onClose: () => void;
  onVideoUploaded: (video: any) => void;
}

export const VideoUploader = ({ onClose, onVideoUploaded }: VideoUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Adicionando classe ao body para impedir rolagem
    document.body.classList.add("overflow-hidden");
    
    return () => {
      // Removendo classe do body ao desmontar
      document.body.classList.remove("overflow-hidden");
      
      // Limpar URL de objeto se existir
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoTitle(file.name.replace(/\.[^/.]+$/, "")); // Remove a extensão
      setVideoPreview(URL.createObjectURL(file));
      setUploadError("");
    } else {
      setUploadError("Por favor, selecione um arquivo de vídeo válido.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".wmv"]
    },
    maxFiles: 1,
  });

  const handleAddUrl = () => {
    if (newUrl.trim() && !urls.includes(newUrl.trim())) {
      setUrls([...urls, newUrl.trim()]);
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls(urls.filter(url => url !== urlToRemove));
  };

  const handleUpload = () => {
    if (!videoFile) {
      setUploadError("Nenhum vídeo selecionado.");
      return;
    }

    if (!videoTitle.trim()) {
      setUploadError("Por favor, insira um título para o vídeo.");
      return;
    }

    if (urls.length === 0) {
      setUploadError("Adicione pelo menos uma URL de destino.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulando upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(true);
          
          // Simulando processamento de vídeo após upload
          setTimeout(() => {
            setIsProcessing(false);
            onVideoUploaded({
              title: videoTitle,
              thumbnail: videoPreview || "https://placehold.co/320x180?text=Video",
              status: "active",
              views: 0,
              urls: urls,
              uploadDate: new Date().toLocaleDateString("pt-BR"),
              ctaText: "Saiba Mais",
              ctaUrl: urls[0]
            });
          }, 2000);
          
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Adicionar Novo Vídeo</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Upload de Vídeo */}
            {!videoFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
                `}
              >
                <input {...getInputProps()} />
                <FileVideo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700">
                  Arraste e solte um vídeo aqui, ou clique para selecionar
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos suportados: MP4, MOV, AVI, WMV
                </p>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row items-center">
                  {videoPreview && (
                    <div className="w-full md:w-48 mb-4 md:mb-0 flex-shrink-0">
                      <video
                        src={videoPreview}
                        className="w-full h-auto rounded"
                        controls
                      />
                    </div>
                  )}
                  <div className="ml-0 md:ml-4 flex-1 min-w-0">
                    <p className="font-medium truncate">{videoFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => {
                        if (videoPreview) {
                          URL.revokeObjectURL(videoPreview);
                        }
                        setVideoFile(null);
                        setVideoPreview(null);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium mt-2"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Informações do Vídeo */}
            <div>
              <Label htmlFor="videoTitle">Título do Vídeo</Label>
              <Input
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Ex: Tour virtual da casa - Jardins"
                className="mt-1"
                disabled={isUploading || isProcessing}
              />
            </div>

            {/* URLs de Destino */}
            <div>
              <Label>URLs de Destino</Label>
              <p className="text-sm text-gray-500 mt-1 mb-2">
                Adicione as URLs das páginas onde este vídeo deve aparecer
              </p>
              
              {urls.length > 0 && (
                <div className="border rounded-md divide-y mb-2">
                  {urls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <div className="flex items-center overflow-hidden">
                        <Link className="h-4 w-4 text-gray-400 flex-shrink-0 mr-2" />
                        <span className="text-sm truncate">{url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveUrl(url)}
                        className="text-red-500 hover:text-red-700 ml-2"
                        disabled={isUploading || isProcessing}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex mt-2">
                <Input
                  placeholder="https://seusite.com.br/pagina"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1"
                  disabled={isUploading || isProcessing}
                />
                <Button
                  type="button"
                  onClick={handleAddUrl}
                  disabled={!newUrl.trim() || isUploading || isProcessing}
                  className="ml-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progresso de Upload */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {isProcessing ? "Processando vídeo..." : "Enviando..."}
                  </span>
                  <span className="text-sm text-gray-500">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {isProcessing 
                    ? "Convertendo vídeo para formato otimizado para web..." 
                    : "Não feche esta janela durante o upload"}
                </p>
              </div>
            )}

            {/* Mensagem de Erro */}
            {uploadError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isUploading || isProcessing}
              >
                Cancelar
              </Button>
              
              <Button
                onClick={handleUpload}
                disabled={!videoFile || isUploading || isProcessing || urls.length === 0}
                className="relative"
              >
                {isUploading || isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    {isProcessing ? "Processando..." : "Enviando..."}
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar Vídeo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
