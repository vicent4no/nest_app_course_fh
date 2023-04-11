import { ApiController } from 'src/common/decorators/api-controller.decorator';
import { APIAvailableVersions } from '../../shared/config/api.configuration';

@ApiController(APIAvailableVersions.V1, 'product-images')
export class ProductImagesController {}
