package DashboardMicorservice.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import DashboardMicorservice.models.Dashboard;

@Repository
public interface DashboardRepository extends CrudRepository<Dashboard, Long>{

}
