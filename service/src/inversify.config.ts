import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Singleton",
});

// Used when there is a circular dependency
const { lazyInject } = getDecorators(container);

export { container, lazyInject };
