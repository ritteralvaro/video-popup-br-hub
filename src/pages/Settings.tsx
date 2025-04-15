
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, User, Building, Mail, Phone, 
  Key, Upload, Bell, Shield, HardDrive, Video
} from "lucide-react";

export default function Settings() {
  // Dados simulados do usuário
  const [userData, setUserData] = useState({
    name: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).name : "Usuário Demonstração",
    email: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).email : "demo@exemplo.com.br",
    phone: "(11) 98765-4321",
    company: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).company : "Imobiliária Modelo",
    cnpj: "12.345.678/0001-90",
    address: "Avenida Paulista, 1000, São Paulo - SP"
  });

  // Configurações de notificação
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newViewNotifications: false,
    weeklyReports: true,
    storageAlerts: true
  });

  // Configurações de reprodução de vídeo
  const [videoSettings, setVideoSettings] = useState({
    autoplay: true,
    muted: true,
    loop: false,
    showControls: true,
    delayBeforeShow: 2, // segundos
  });

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
  };

  const handleVideoSettingChange = (key: keyof typeof videoSettings, value: any) => {
    setVideoSettings({
      ...videoSettings,
      [key]: value
    });
  };

  const handleSaveSettings = () => {
    // Simulando a salvamento de configurações
    localStorage.setItem("user", JSON.stringify({
      ...JSON.parse(localStorage.getItem("user") || "{}"),
      name: userData.name,
      email: userData.email,
      company: userData.company
    }));
    
    alert("Configurações salvas com sucesso!");
  };

  return (
    <AuthLayout>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
            <p className="text-gray-600">Gerencie as configurações da sua conta</p>
          </div>

          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="company">Empresa</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="video">Vídeo</TabsTrigger>
              <TabsTrigger value="storage">Armazenamento</TabsTrigger>
            </TabsList>
            
            {/* Configurações de Conta */}
            <TabsContent value="account">
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Informações Pessoais</h3>
                    <p className="text-gray-600 mt-1">
                      Edite suas informações pessoais e altere sua senha
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleUserDataChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleUserDataChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserDataChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800">Alterar Senha</h4>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="mr-2">
                      <Key className="h-4 w-4 mr-2" />
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Configurações da Empresa */}
            <TabsContent value="company">
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Informações da Empresa</h3>
                    <p className="text-gray-600 mt-1">
                      Configure as informações da sua empresa
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Nome da Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        value={userData.company}
                        onChange={handleUserDataChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        name="cnpj"
                        value={userData.cnpj}
                        onChange={handleUserDataChange}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleUserDataChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800">Logo da Empresa</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Sua logo será exibida no canto do popup de vídeo
                  </p>
                  
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Enviar Logo
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Configurações de Notificações */}
            <TabsContent value="notifications">
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Configurações de Notificações</h3>
                    <p className="text-gray-600 mt-1">
                      Gerencie como e quando você recebe atualizações
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações por Email</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Receba atualizações importantes por email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Novas Visualizações</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Receba alertas quando seus vídeos receberem muitas visualizações
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.newViewNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("newViewNotifications", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Relatórios Semanais</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Receba um resumo semanal do desempenho dos seus vídeos
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("weeklyReports", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Alertas de Armazenamento</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Seja notificado quando seu armazenamento estiver quase cheio
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.storageAlerts}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("storageAlerts", checked)
                      }
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Configurações de Vídeo */}
            <TabsContent value="video">
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Video className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Configurações de Reprodução</h3>
                    <p className="text-gray-600 mt-1">
                      Configure como seus popups de vídeo serão exibidos
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reprodução Automática</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Reproduzir vídeos automaticamente quando o popup for exibido
                      </p>
                    </div>
                    <Switch
                      checked={videoSettings.autoplay}
                      onCheckedChange={(checked) => 
                        handleVideoSettingChange("autoplay", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mudo</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Iniciar vídeos sem áudio (recomendado para reprodução automática)
                      </p>
                    </div>
                    <Switch
                      checked={videoSettings.muted}
                      onCheckedChange={(checked) => 
                        handleVideoSettingChange("muted", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Loop</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Repetir o vídeo continuamente
                      </p>
                    </div>
                    <Switch
                      checked={videoSettings.loop}
                      onCheckedChange={(checked) => 
                        handleVideoSettingChange("loop", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mostrar Controles</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Exibir controles de vídeo (play, pause, volume, etc.)
                      </p>
                    </div>
                    <Switch
                      checked={videoSettings.showControls}
                      onCheckedChange={(checked) => 
                        handleVideoSettingChange("showControls", checked)
                      }
                    />
                  </div>
                  
                  <div>
                    <div className="mb-2">
                      <h4 className="font-medium">Atraso antes de exibir (segundos)</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Tempo de espera antes de exibir o popup após o carregamento da página
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="30"
                        value={videoSettings.delayBeforeShow}
                        onChange={(e) => 
                          handleVideoSettingChange("delayBeforeShow", 
                            parseInt(e.target.value) || 0)
                        }
                        className="w-24"
                      />
                      <span className="text-gray-600">segundos</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Configurações de Armazenamento */}
            <TabsContent value="storage">
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HardDrive className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Armazenamento</h3>
                    <p className="text-gray-600 mt-1">
                      Gerencie seu espaço de armazenamento
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Usado: 2.4 GB</span>
                      <span className="text-gray-600">Total: 10 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: '24%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      24% do seu espaço de armazenamento está sendo utilizado
                    </span>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium">Detalhamento do Armazenamento</h4>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div className="flex items-center">
                          <Video className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <h5 className="font-medium">Vídeos</h5>
                            <p className="text-xs text-gray-500">12 arquivos</p>
                          </div>
                        </div>
                        <span className="text-gray-700">2.4 GB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium">Planos de Armazenamento</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Precisa de mais espaço? Atualize seu plano.
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 border-2 border-gray-200">
                        <h5 className="font-medium">Básico</h5>
                        <p className="text-2xl font-bold mt-2">10 GB</p>
                        <p className="text-sm text-gray-500 mt-1">Seu plano atual</p>
                        <Button variant="outline" className="w-full mt-4" disabled>
                          Atual
                        </Button>
                      </Card>
                      
                      <Card className="p-4 border-2 border-blue-200">
                        <h5 className="font-medium">Profissional</h5>
                        <p className="text-2xl font-bold mt-2">50 GB</p>
                        <p className="text-sm text-gray-500 mt-1">R$ 99/mês</p>
                        <Button className="w-full mt-4">
                          Atualizar
                        </Button>
                      </Card>
                      
                      <Card className="p-4 border-2 border-gray-200">
                        <h5 className="font-medium">Empresarial</h5>
                        <p className="text-2xl font-bold mt-2">100 GB</p>
                        <p className="text-sm text-gray-500 mt-1">R$ 199/mês</p>
                        <Button variant="outline" className="w-full mt-4">
                          Atualizar
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </MainLayout>
    </AuthLayout>
  );
}
