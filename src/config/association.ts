import Usuario from '@models/Usuario';
import Foto from '@models/Foto';
import Viagem from '@models/Viagem';

const setupAssociations = () => {
    console.log('🔗 Configurando associações entre modelos...');
    
    const models = { Usuario, Foto, Viagem };
    
    // Chamar o método associate de cada modelo
    Object.values(models).forEach((model: any) => {
        if (model.associate) {
            console.log(`✅ Configurando associações para ${model.name}`);
            model.associate(models);
        }
    });
    
    console.log('🎯 Associações configuradas com sucesso!');
};

export default setupAssociations;