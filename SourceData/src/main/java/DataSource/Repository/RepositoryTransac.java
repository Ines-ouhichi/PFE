package DataSource.Repository;

import java.util.Optional;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import DataSource.Model.Transactions;


public interface RepositoryTransac extends ElasticsearchRepository<Transactions, String> {
	
    Optional<Transactions> findById(Long transaction_id);


}
