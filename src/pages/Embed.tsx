
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Copy, CheckCircle, Code, ExternalLink } from "lucide-react";

export default function Embed() {
  const [copied, setCopied] = useState(false);
  
  // Código de incorporação simulado
  const embedCode = `<!-- VideoPop Widget -->
<script src="https://videopop.com.br/embed/${localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).id : "demo"}.js"></script>
<!-- Fim do VideoPop Widget -->`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Código de Incorporação</h1>
            <p className="text-gray-600">
              Adicione o VideoPop ao seu site com este código
            </p>
          </div>

          <Card className="p-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">Código de Incorporação</h3>
                <p className="text-gray-600 mt-1">
                  Adicione este código ao final da sua página HTML, logo antes do fechamento da tag &lt;/body&gt;.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
                  {embedCode}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCode}
                  className="ml-2 flex-shrink-0"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-amber-800">Importante</h4>
                  <div className="mt-1 text-sm text-amber-700 space-y-2">
                    <p>
                      Este código deve ser adicionado em todas as páginas onde você deseja que os
                      popups de vídeo apareçam.
                    </p>
                    <p>
                      O código verificará automaticamente a URL da página atual e mostrará o vídeo
                      correspondente se uma URL de destino configurada for encontrada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Como Instalar</h3>
            <div className="space-y-4">
              <div className="flex">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Copie o código acima</h4>
                  <p className="text-gray-600 mt-1">
                    Clique no botão de cópia para copiar o código de incorporação.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Acesse o seu site</h4>
                  <p className="text-gray-600 mt-1">
                    Entre no sistema de gerenciamento do seu site ou entre em contato com seu desenvolvedor.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Cole o código</h4>
                  <p className="text-gray-600 mt-1">
                    Adicione o código no rodapé do seu site, logo antes do fechamento da tag &lt;/body&gt;.
                    Se o seu site usa um gerenciador de tags, você também pode adicioná-lo lá.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Configure seus vídeos</h4>
                  <p className="text-gray-600 mt-1">
                    Volte para a seção de "Vídeos" e adicione as URLs de destino para cada vídeo
                    que você deseja exibir em seu site.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="font-medium">Precisa de ajuda com a instalação?</h4>
              <p className="text-gray-600 mt-1">
                Nossa equipe de suporte está disponível para ajudar você a configurar o VideoPop no seu site.
              </p>
              <div className="mt-4">
                <Button variant="outline" className="mr-2">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Tutorial
                </Button>
                <Button>Contatar Suporte</Button>
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    </AuthLayout>
  );
}
