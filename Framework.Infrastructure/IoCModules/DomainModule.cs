﻿using Framework.Core.Contracts.Domain;
using Framework.Domain;
using Ninject.Modules;

namespace Framework.Infrastructure.IoCModules
{
    public class DomainModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IPersonDomain>().To<PersonDomain>();
            Bind<ICarDomain>().To<CarDomain>();
        }
    }
}