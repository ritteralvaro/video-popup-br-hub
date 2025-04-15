
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Trash2, Plus, Link } from "lucide-react";

interface VideoModalProps {
  video: any;
  onClose: () => void;
  onSave: (updatedVideo: any) => void;
}

export const VideoModal = ({ video, onClose, onSave }: VideoModalProps) => {
  const [editedVideo, setEditedVideo] = useState(video);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    // Adicionando classe ao body para impedir rolagem
    document.body.classList.add("overflow-hidden");
    
    return () => {
      // Removendo classe do body ao desmontar
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedVideo({
      ...editedVideo,
      [name]: value
    });
  };

  const handleToggleStatus = () => {
    setEditedVideo({
      ...editedVideo,
      status: editedVideo.status === "active" ? "inactive" : "active"
    });
  };

  const handleAddUrl = () => {
    if (newUrl.trim() && !editedVideo.urls.includes(newUrl.trim())) {
      setEditedVideo({
        ...editedVideo,
        urls: [...editedVideo.urls, newUrl.trim()]
      });
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setEditedVideo({
      ...editedVideo,
      urls: editedVideo.urls.filter((url: string) => url !== urlToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedVideo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Editar Vídeo</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Informações Básicas</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Vídeo</Label>
                    <Input
                      id="title"
                      name="title"
                      value={editedVideo.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editedVideo.status === "active"}
                      onCheckedChange={handleToggleStatus}
                      id="status"
                    />
                    <Label htmlFor="status" className="cursor-pointer">
                      {editedVideo.status === "active" ? "Ativo" : "Inativo"}
                    </Label>
                  </div>
                </div>
              </div>

              {/* URLs de Destino */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">URLs de Destino</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Adicione as URLs das páginas onde este vídeo deve aparecer.
                </p>
                
                <div className="space-y-4">
                  {editedVideo.urls.length > 0 ? (
                    <div className="border rounded-md divide-y">
                      {editedVideo.urls.map((url: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3">
                          <div className="flex items-center overflow-hidden">
                            <Link className="h-4 w-4 text-gray-400 flex-shrink-0 mr-2" />
                            <span className="text-sm truncate">{url}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveUrl(url)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 border border-dashed rounded-md">
                      <p className="text-sm text-gray-500">
                        Nenhuma URL adicionada. Adicione pelo menos uma URL de destino.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex mt-2">
                    <Input
                      placeholder="https://seusite.com.br/pagina"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddUrl}
                      disabled={!newUrl.trim()}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chamada para Ação */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Chamada para Ação (CTA)</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ctaText">Texto do Botão</Label>
                    <Input
                      id="ctaText"
                      name="ctaText"
                      value={editedVideo.ctaText || "Saiba Mais"}
                      onChange={handleChange}
                      placeholder="Saiba Mais"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ctaUrl">URL do Botão</Label>
                    <Input
                      id="ctaUrl"
                      name="ctaUrl"
                      value={editedVideo.ctaUrl || editedVideo.urls[0] || ""}
                      onChange={handleChange}
                      placeholder="https://seusite.com.br/pagina-destino"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
