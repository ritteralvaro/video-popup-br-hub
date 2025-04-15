
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface PopupPreviewProps {
  video: {
    id: number;
    title: string;
    thumbnail: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  onClose: () => void;
}

export const PopupPreview = ({ video, onClose }: PopupPreviewProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno atraso para a animação de entrada
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Pequeno atraso para a animação de saída
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ${
        isVisible ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      onClick={handleClose}
    >
      <Card 
        className={`w-full max-w-lg shadow-xl transition-all duration-300 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button 
            onClick={handleClose}
            className="absolute right-2 top-2 z-10 bg-white bg-opacity-90 rounded-full p-1 text-gray-700 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative pt-[56.25%] overflow-hidden rounded-t-lg">
            <video
              src={typeof video.thumbnail === "string" && video.thumbnail.startsWith("blob:") 
                ? video.thumbnail 
                : undefined}
              poster={typeof video.thumbnail === "string" && !video.thumbnail.startsWith("blob:") 
                ? video.thumbnail 
                : undefined}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
              muted
            />
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-medium">{video.title}</h3>
            
            <div className="mt-4 flex justify-end">
              <Button size="sm" className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                {video.ctaText || "Saiba Mais"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
