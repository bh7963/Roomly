import { ResponseDto } from 'src/apis/hostmypage';
import Host from 'src/types/admin/host.interface';

export default interface GetHostListResponseDto extends ResponseDto{

    hostList: Host[];
}