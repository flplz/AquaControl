'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Home, BarChart3, Settings, Zap, TrendingUp, Activity, Save, AlertCircle, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export default function AquaControlApp() {
  const [currentScreen, setCurrentScreen] = useState(0)
  
  // Estados para configurações
  const [settings, setSettings] = useState({
    monthlyGoal: 1000,
    alertLimit: 5,
    emailNotifications: true,
    roomSettings: {
      'Banheiro': { monitoring: true, alerts: true },
      'Lavanderia': { monitoring: true, alerts: true },
      'Cozinha': { monitoring: true, alerts: true },
      'Área Externa': { monitoring: true, alerts: true }
    }
  })
  
  const [pendingSettings, setPendingSettings] = useState({
    monthlyGoal: 1000,
    alertLimit: 5,
    emailNotifications: true,
    roomSettings: {
      'Banheiro': { monitoring: true, alerts: true },
      'Lavanderia': { monitoring: true, alerts: true },
      'Cozinha': { monitoring: true, alerts: true },
      'Área Externa': { monitoring: true, alerts: true }
    }
  })
  
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [inputValues, setInputValues] = useState<{
    monthlyGoal: string;
    alertLimit: string;
  }>({
    monthlyGoal: '',
    alertLimit: ''
  })

  // Funções para gerenciar configurações
  const updateSetting = (key: string, value: any) => {
    setPendingSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateRoomSetting = (room: string, setting: string, value: boolean) => {
    setPendingSettings(prev => ({
      ...prev,
      roomSettings: {
        ...prev.roomSettings,
        [room]: {
          ...prev.roomSettings[room as keyof typeof prev.roomSettings],
          [setting]: value
        }
      }
    }))
  }

  const saveSettings = () => {
    // Processar valores dos inputs se existirem
    let finalSettings = { ...pendingSettings }
    
    if (inputValues.monthlyGoal !== '') {
      finalSettings.monthlyGoal = parseInt(inputValues.monthlyGoal)
    }
    
    if (inputValues.alertLimit !== '') {
      finalSettings.alertLimit = parseInt(inputValues.alertLimit)
    }
    
    // Salvar as configurações
    setSettings(finalSettings)
    setShowSaveMessage(true)
    
    // Salvar no localStorage
    localStorage.setItem('aquacontrol-settings', JSON.stringify(finalSettings))
    
    // Limpar inputs após salvar
    setInputValues({ monthlyGoal: '', alertLimit: '' })
    
    // Recarregar a página após 3 segundos
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }

  // Carregar configurações salvas
  useEffect(() => {
    const savedSettings = localStorage.getItem('aquacontrol-settings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      setPendingSettings(parsed)
    }
  }, [])

  const screens = [
    {
      id: 0,
      title: "Visão Geral",
      description: "Dashboard principal do sistema",
      icon: Home,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 1,
      title: "Monitoramento",
      description: "Controle em tempo real",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      title: "Configurações",
      description: "Ajustes do sistema",
      icon: Settings,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Consumo por Cômodo",
      description: "Análise detalhada por ambiente",
      icon: Droplets,
      color: "from-orange-500 to-red-500"
    }
  ]

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <Screen1 />
      case 1:
        return <Screen2 />
      case 2:
        return <Screen3 
          settings={pendingSettings} 
          updateSetting={updateSetting} 
          updateRoomSetting={updateRoomSetting} 
          saveSettings={saveSettings} 
          showSaveMessage={showSaveMessage}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      case 3:
        return <Screen4 />
      default:
        return <Screen1 />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-logo-bg">
                <Image
                  src="/logo.PNG"
                  alt="AquaControl Logo"
                                                        width={48}
                   height={48}
                   className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div>
                                 <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">AquaControl</h1>
                <p className="text-sm text-gray-600">Sistema Inteligente de Controle</p>
              </div>
            </div>
            
                         {/* Navegação Desktop */}
             <nav className="hidden lg:flex space-x-1">
               {screens.map((screen) => (
                 <button
                   key={screen.id}
                   onClick={() => setCurrentScreen(screen.id)}
                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                     currentScreen === screen.id
                       ? 'bg-gradient-to-r ' + screen.color + ' text-white shadow-lg'
                       : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                   }`}
                 >
                   {screen.title}
                 </button>
               ))}
             </nav>
             
             {/* Navegação Tablet */}
             <nav className="hidden md:flex lg:hidden space-x-1">
               {screens.map((screen) => (
                 <button
                   key={screen.id}
                   onClick={() => setCurrentScreen(screen.id)}
                   className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                     currentScreen === screen.id
                       ? 'bg-gradient-to-r ' + screen.color + ' text-white shadow-lg'
                       : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                   }`}
                 >
                   {screen.title.split(' ')[0]}
                 </button>
               ))}
             </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderScreen()}
      </main>

             {/* Navegação Mobile */}
       <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
         <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-2">
           <div className="flex justify-around">
             {screens.map((screen) => (
               <button
                 key={screen.id}
                 onClick={() => setCurrentScreen(screen.id)}
                 className={`p-3 rounded-lg transition-all duration-200 ${
                   currentScreen === screen.id
                     ? 'bg-gradient-to-r ' + screen.color + ' text-white shadow-md'
                     : 'text-gray-600 hover:text-gray-900'
                 }`}
               >
                 <screen.icon className="w-5 h-5" />
               </button>
             ))}
           </div>
         </div>
       </div>
    </div>
  )
}

// Componente Tela 1 - Visão Geral com Logo Elaborada
function Screen1() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Logo e Título Principal */}
              <div className="text-center">
                     <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-2xl mb-6 relative overflow-hidden bg-logo-bg">
            <Image
              src="/logo.PNG"
              alt="AquaControl Logo"
                                            width={96}
               height={96}
               className="w-20 h-20 sm:w-24 sm:h-24 object-contain p-2"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
                     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Monitore. Alerte. Economize</h2>
                     <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
             Controle e monitore o consumo de água da sua casa para economizar e evitar desperdícios
           </p>
        </div>

             {/* Cards Principais */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Consumo Total</h3>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
          </div>
                     <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">1.247 L</div>
          <p className="text-sm text-gray-600 mb-3">Este mês</p>
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">-12% vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Economia</h3>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
                     <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">15%</div>
          <p className="text-sm text-gray-600 mb-3">Meta atingida</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Status Sistema</h3>
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
                     <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">Online</div>
          <p className="text-sm text-gray-600 mb-3">Todos os sensores ativos</p>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* Consumo por Cômodo */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Distribuição por Cômodo</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: 'Banheiro', value: '45%', color: 'bg-blue-500', icon: '🚿', liters: '247L' },
            { name: 'Lavanderia', value: '30%', color: 'bg-green-500', icon: '🧺', liters: '165L' },
            { name: 'Cozinha', value: '20%', color: 'bg-yellow-500', icon: '🍳', liters: '110L' },
            { name: 'Área Externa', value: '5%', color: 'bg-purple-500', icon: '🌱', liters: '28L' }
          ].map((item) => (
            <div key={item.name} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className={`w-20 h-20 ${item.color} rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
              <div className="text-2xl font-bold text-blue-600 mb-1">{item.liters}</div>
              <div className={`w-16 h-16 ${item.color} rounded-full mx-auto flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo Rápido */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Resumo do Dia</h3>
            <p className="text-blue-100">Consumo otimizado e dentro das metas</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">550 L</div>
            <div className="text-blue-100">Total Consumido</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Componente Tela 2 - Monitoramento
function Screen2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Monitoramento em Tempo Real</h2>
        <p className="text-lg text-gray-600">
          Acompanhe o consumo de água em tempo real em todos os cômodos.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Fluxo de Água Atual</h3>
          <div className="space-y-4">
            {[
              { name: 'Banheiro', flow: '2.5 L/min', status: 'Ativo' },
              { name: 'Lavanderia', flow: '0 L/min', status: 'Inativo' },
              { name: 'Cozinha', flow: '1.8 L/min', status: 'Ativo' },
              { name: 'Área Externa', flow: '0 L/min', status: 'Inativo' }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.flow}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Gráfico de Consumo</h3>
          <div className="h-64 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg flex items-end justify-around p-4">
            {[20, 45, 30, 60, 25, 40, 35].map((height, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t-lg water-flow"
                style={{ height: `${height}%`, width: '8%' }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Alertas e Notificações</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <p className="text-sm text-yellow-800">Consumo acima da média no banheiro</p>
          </div>
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <p className="text-sm text-green-800">Meta de economia atingida!</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Componente Tela 3 - Configurações
function Screen3({ 
  settings, 
  updateSetting, 
  updateRoomSetting, 
  saveSettings, 
  showSaveMessage,
  inputValues,
  setInputValues
}: {
  settings: any
  updateSetting: (key: string, value: any) => void
  updateRoomSetting: (room: string, setting: string, value: boolean) => void
  saveSettings: () => void
  showSaveMessage: boolean
  inputValues: { monthlyGoal: string; alertLimit: string }
  setInputValues: React.Dispatch<React.SetStateAction<{ monthlyGoal: string; alertLimit: string }>>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
             <div className="text-center">
         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Configurações do Sistema</h2>
         <p className="text-lg text-gray-600">
           Configure parâmetros e preferências do AquaControl.
         </p>
         {showSaveMessage && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center justify-center"
           >
                           <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">✅ Configurações salvas com sucesso! A página será recarregada em 3 segundos...</span>
           </motion.div>
         )}
       </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Configurações Gerais</h3>
          <div className="space-y-4">
                                       <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta de Consumo Mensal (L)
                </label>
                <input
                  type="number"
                  value={inputValues.monthlyGoal}
                  onChange={(e) => setInputValues((prev: { monthlyGoal: string; alertLimit: string }) => ({ ...prev, monthlyGoal: e.target.value }))}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  onBlur={(e) => {
                    if (e.target.value !== '') {
                      // Mostrar o valor temporariamente, mas não salvar ainda
                      setInputValues((prev: { monthlyGoal: string; alertLimit: string }) => ({ ...prev, monthlyGoal: e.target.value }))
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Valor atual: {settings.monthlyGoal} L</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limite de Alerta (L/min)
                </label>
                <input
                  type="number"
                  value={inputValues.alertLimit}
                  onChange={(e) => setInputValues((prev: { monthlyGoal: string; alertLimit: string }) => ({ ...prev, alertLimit: e.target.value }))}
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  onBlur={(e) => {
                    if (e.target.value !== '') {
                      // Mostrar o valor temporariamente, mas não salvar ainda
                      setInputValues((prev: { monthlyGoal: string; alertLimit: string }) => ({ ...prev, alertLimit: e.target.value }))
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Valor atual: {settings.alertLimit} L/min</p>
              </div>
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-gray-700">Notificações por Email</span>
               <button 
                 onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                 className={`w-12 h-6 rounded-full relative transition-colors ${
                   settings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300'
                 }`}
               >
                 <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                   settings.emailNotifications ? 'right-0.5' : 'left-0.5'
                 }`}></div>
               </button>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Configurações por Cômodo</h3>
                     <div className="space-y-4">
             {['Banheiro', 'Lavanderia', 'Cozinha', 'Área Externa'].map((room) => (
               <div key={room} className="border border-gray-200 rounded-lg p-4">
                 <h4 className="font-medium text-gray-900 mb-2">{room}</h4>
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Monitoramento</span>
                                           <button 
                        onClick={() => updateRoomSetting(room, 'monitoring', !settings.roomSettings[room as keyof typeof settings.roomSettings].monitoring)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          settings.roomSettings[room as keyof typeof settings.roomSettings].monitoring ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                          settings.roomSettings[room as keyof typeof settings.roomSettings].monitoring ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                      </button>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Alertas</span>
                                           <button 
                        onClick={() => updateRoomSetting(room, 'alerts', !settings.roomSettings[room as keyof typeof settings.roomSettings].alerts)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          settings.roomSettings[room as keyof typeof settings.roomSettings].alerts ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                          settings.roomSettings[room as keyof typeof settings.roomSettings].alerts ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                      </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
         <h3 className="text-xl font-semibold text-gray-900 mb-4">Manutenção</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
             <h4 className="font-medium text-gray-900">Calibrar Sensores</h4>
             <p className="text-sm text-gray-600 mt-1">Última calibração: há 30 dias</p>
           </button>
           <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
             <h4 className="font-medium text-gray-900">Backup de Dados</h4>
             <p className="text-sm text-gray-600 mt-1">Último backup: hoje</p>
           </button>
           <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
             <h4 className="font-medium text-gray-900">Atualizar Sistema</h4>
             <p className="text-sm text-gray-600 mt-1">Versão atual: 2.1.0</p>
           </button>
         </div>
         <div className="mt-6 pt-6 border-t border-gray-200">
           <button 
             onClick={saveSettings}
             className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center"
           >
             <Save className="w-5 h-5 mr-2" />
             Salvar Configurações
           </button>
         </div>
       </div>
    </motion.div>
  )
}

// Componente Tela 4 - Consumo por Cômodo
function Screen4() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  
  const roomData = [
    {
      name: 'Banheiro',
      liters: 247,
      percentage: 45,
      color: 'bg-blue-500',
      icon: '🚿',
      details: [
        { item: 'Chuveiro', liters: 180 },
        { item: 'Pia', liters: 45 },
        { item: 'Vaso', liters: 22 }
      ]
    },
    {
      name: 'Lavanderia',
      liters: 165,
      percentage: 30,
      color: 'bg-green-500',
      icon: '🧺',
      details: [
        { item: 'Máquina de Lavar', liters: 120 },
        { item: 'Tanque', liters: 35 },
        { item: 'Pia', liters: 10 }
      ]
    },
    {
      name: 'Cozinha',
      liters: 110,
      percentage: 20,
      color: 'bg-yellow-500',
      icon: '🍳',
      details: [
        { item: 'Pia Principal', liters: 85 },
        { item: 'Filtro', liters: 15 },
        { item: 'Limpeza', liters: 10 }
      ]
    },
    {
      name: 'Área Externa',
      liters: 28,
      percentage: 5,
      color: 'bg-purple-500',
      icon: '🌱',
      details: [
        { item: 'Jardim', liters: 20 },
        { item: 'Lavagem', liters: 8 }
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Consumo por Cômodo</h2>
        <p className="text-lg text-gray-600">
          Análise detalhada do consumo de água em cada ambiente da casa.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Resumo Geral */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Resumo Geral</h3>
          <div className="space-y-4">
            {roomData.map((room) => (
              <div key={room.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{room.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{room.name}</p>
                    <p className="text-sm text-gray-600">{room.liters} litros</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`w-12 h-12 ${room.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{room.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total Consumido:</span>
              <span className="text-2xl font-bold text-blue-600">550 L</span>
            </div>
          </div>
        </div>

                 {/* Gráfico de Pizza Interativo */}
         <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
           <h3 className="text-xl font-semibold text-gray-900 mb-4">Distribuição do Consumo</h3>
           <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
             <svg className="w-full h-full" viewBox="0 0 100 100">
               {/* Círculo de fundo */}
               <circle
                 cx="50"
                 cy="50"
                 r="40"
                 fill="none"
                 stroke="#e5e7eb"
                 strokeWidth="8"
               />
               
               {/* Fatias do gráfico */}
               {roomData.map((room, index) => {
                 // Calcular ângulos para cada fatia
                 const totalPercentage = roomData.reduce((sum, r) => sum + r.percentage, 0)
                 const startAngle = roomData
                   .slice(0, index)
                   .reduce((sum, r) => sum + (r.percentage / totalPercentage) * 360, 0)
                 const endAngle = startAngle + (room.percentage / totalPercentage) * 360
                 
                 // Converter ângulos para coordenadas SVG
                 const startRad = (startAngle - 90) * Math.PI / 180
                 const endRad = (endAngle - 90) * Math.PI / 180
                 
                 const x1 = 50 + 40 * Math.cos(startRad)
                 const y1 = 50 + 40 * Math.sin(startRad)
                 const x2 = 50 + 40 * Math.cos(endRad)
                 const y2 = 50 + 40 * Math.sin(endRad)
                 
                 // Determinar se a fatia é maior que 180 graus
                 const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
                 
                 // Criar o path da fatia
                 const pathData = [
                   `M 50 50`,
                   `L ${x1} ${y1}`,
                   `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                   `Z`
                 ].join(' ')
                 
                 // Cores correspondentes
                 const fillColor = room.color === 'bg-blue-500' ? '#3b82f6' :
                                  room.color === 'bg-green-500' ? '#10b981' :
                                  room.color === 'bg-yellow-500' ? '#f59e0b' :
                                  room.color === 'bg-purple-500' ? '#8b5cf6' : '#3b82f6'
                 
                 const isSelected = selectedRoom === room.name
                 const isHovered = hoveredRoom === room.name
                 const opacity = selectedRoom && !isSelected ? 0.3 : 1
                 const strokeWidth = isSelected || isHovered ? 2 : 0
                 const strokeColor = '#ffffff'
                 
                 return (
                   <motion.path
                     key={room.name}
                     d={pathData}
                     fill={fillColor}
                     stroke={strokeColor}
                     strokeWidth={strokeWidth}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ 
                       opacity: opacity,
                       scale: 1
                     }}
                     transition={{ 
                       duration: 1.5, 
                       delay: index * 0.2,
                       ease: "easeOut"
                     }}
                     className="cursor-pointer transition-all duration-300"
                     style={{ 
                       filter: isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                     }}
                     onMouseEnter={() => setHoveredRoom(room.name)}
                     onMouseLeave={() => setHoveredRoom(null)}
                     onClick={() => setSelectedRoom(selectedRoom === room.name ? null : room.name)}
                   />
                 )
               })}
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 className="text-center"
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 1, duration: 0.5 }}
               >
                 {selectedRoom ? (
                   <div>
                     <div className="text-2xl font-bold text-gray-900">
                       {roomData.find(r => r.name === selectedRoom)?.liters}L
                     </div>
                     <div className="text-sm text-gray-600">{selectedRoom}</div>
                   </div>
                 ) : (
                   <div>
                     <div className="text-3xl font-bold text-gray-900">550L</div>
                     <div className="text-sm text-gray-600">Total</div>
                   </div>
                 )}
               </motion.div>
             </div>
           </div>
           
           {/* Legenda Interativa */}
           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
             {roomData.map((room, index) => {
               const isSelected = selectedRoom === room.name
               const isHovered = hoveredRoom === room.name
               
               return (
                 <motion.div
                   key={room.name}
                   className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                     isSelected 
                       ? 'bg-blue-50 border-2 border-blue-200 shadow-md' 
                       : isHovered 
                       ? 'bg-gray-50 border border-gray-200' 
                       : 'hover:bg-gray-50'
                   }`}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 1.5 + index * 0.1 }}
                   whileHover={{ scale: 1.02 }}
                   onMouseEnter={() => setHoveredRoom(room.name)}
                   onMouseLeave={() => setHoveredRoom(null)}
                   onClick={() => setSelectedRoom(selectedRoom === room.name ? null : room.name)}
                 >
                   <div 
                     className={`w-4 h-4 rounded-full transition-all duration-300 ${
                       isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                     }`}
                     style={{ 
                       backgroundColor: room.color === 'bg-blue-500' ? '#3b82f6' :
                                     room.color === 'bg-green-500' ? '#10b981' :
                                     room.color === 'bg-yellow-500' ? '#f59e0b' :
                                     room.color === 'bg-purple-500' ? '#8b5cf6' : '#3b82f6'
                     }}
                   ></div>
                   <span className={`text-sm font-medium transition-colors ${
                     isSelected ? 'text-blue-900' : 'text-gray-700'
                   }`}>{room.name}</span>
                   <span className={`text-sm transition-colors ${
                     isSelected ? 'text-blue-700' : 'text-gray-500'
                   }`}>({room.percentage}%)</span>
                 </motion.div>
               )
             })}
           </div>
           
           {/* Instruções */}
           <div className="mt-4 text-center">
             <p className="text-xs text-gray-500">
               💡 Clique na legenda ou no gráfico para destacar um cômodo
             </p>
           </div>
         </div>
      </div>

      {/* Detalhamento por Cômodo */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Detalhamento por Cômodo</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roomData.map((room) => (
            <div key={room.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{room.icon}</span>
                <h4 className="font-semibold text-gray-900">{room.name}</h4>
              </div>
              <div className="space-y-2">
                {room.details.map((detail) => (
                  <div key={detail.item} className="flex justify-between text-sm">
                    <span className="text-gray-600">{detail.item}</span>
                    <span className="font-medium text-gray-900">{detail.liters}L</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-blue-600">{room.liters}L</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recomendações de Economia</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">✅ Banheiro</h4>
            <p className="text-sm text-green-800">Consumo dentro da média. Continue assim!</p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">⚠️ Lavanderia</h4>
            <p className="text-sm text-yellow-800">Considere usar a máquina com carga cheia.</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Cozinha</h4>
            <p className="text-sm text-blue-800">Instale aeradores nas torneiras para economizar.</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">🌱 Área Externa</h4>
            <p className="text-sm text-purple-800">Use água da chuva para regar as plantas.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}